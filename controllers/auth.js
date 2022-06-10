const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/email");

const User = require("../models/userModel");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expiresIn: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });

  // Remove password from output
  user.user_password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

const signup = async (req, res, next) => {
  try {
    const user = await User.create({
      user_id: req.body.user_id,
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      user_password: req.body.user_password,
      user_address: req.body.user_address,
      user_dob: req.body.user_dob,
      user_role: req.body.user_role,
      user_role_description: req.body.user_role_description,
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: "failed", msg: `can not sign up the user` });
    }

    createSendToken(user, 201, req, res);
  } catch (error) {
    return res.status(400).json({ status: "failed", msg: error });
  }
};

const login = async (req, res, next) => {
  try {
    const { user_email, user_password } = req.body;
    if (!user_email || !user_password) {
      return res.status(401).json({
        status: "failed",
        msg: "Please provide email and password!",
      });
    }
    const user = await User.findOne({ user_email }).select("+user_password");
    if (
      !user ||
      !(await user.checkPassword(user_password, user.user_password))
    ) {
      return res.status(401).json({
        status: "failed",
        msg: "Incorrect email or password",
      });
    }
    createSendToken(user, 200, req, res);
  } catch (error) {
    return res.status(401).json({
      status: "failed",
      msg: error,
    });
  }
};

const logout = (req, res) => {
  try {
    res.cookie("jwt", "loggedout", {
      expires: new Date(Date.now() + 10 * 100),
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      message: "Successfully logged out of your account",
    });
  } catch (error) {
    res.status(402).json({
      status: "failed",
      message: "Can not log out if you are not logged in",
    });
  }
};

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return next(
        res.status(401).json({
          status: "Invalid Token",
          message: "Auth failed, Please provide a valid token",
        })
      );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(404).json({
        status: "failed",
        message: "User does not exist",
      });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Route protection failed",
      error: error,
    });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_role)) {
      return res.status(401).json({
        status: "Missing roles",
        message: "You do not have permissions to perform this action",
      });
    }
    next();
  };
};

const forgotPassword = async (req, res, next) => {
  // 1) Get user based on email
  const user = await User.findOne({ user_email: req.body.user_email });
  if (!user) {
    return res.status(403).json({
      status: "Failed",
      message: `No user found with this email address : ${req.body.user_email}`,
    });
  }

  // 2) Generate the random reset token and add it to user document.
  const resetToken = user.createPasswordResetToken();

  const updatedUser = await User.updateOne(
    { _id: user._id },
    {
      $set: user,
    }
  );

  // 3) Send it to user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a patch request with new password
    to :${resetURL}.\n if you didn't forget your password, please ignore this email!`;

    sendEmail({
      email: user.user_email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.user_password_reset_expires = undefined;
    user.user_password_reset_token = undefined;
    // --- save the user again after removing fields ---
    const updatedUserAfterRemovingFields = await User.updateOne(
      { _id: user._id },
      {
        $set: user,
      }
    );
    return res.status(404).json({
      status: "Failed",
      message: `No user found with this email address : ${req.body.user_email}`,
      error: err,
    });
  }
};

const resetPassword = async (req, res, next) => {
  try {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      user_password_reset_token: hashedToken,
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return next(
        res.status(404).json({
          status: "Failed",
          message: `No user found`,
        })
      );
    }

    user.user_password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    const updatedUser = await User.updateOne(
      { user_id: user.user_id },
      {
        $set: user,
      }
    );

    console.log(updatedUser);

    // 3) Log the user in, send JWT
    createSendToken(user, 200, req, res);
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error,
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
};
