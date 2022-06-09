const User = require("../models/userModel");

const addUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    // Removing password before sending resposne to user
    user.user_password = undefined;
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error });
  }
};

const editUser = async (req, res) => {
  const userId = req.params.id;
  const userData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userData },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "failed", msg: `No user with id : ${userId}` });
    }
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      data: null,
      msg: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ status: "failed", msg: `No user found with id : ${userId}` });
    }
    res.status(204).json({
      status: "success",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      data: null,
      msg: error,
    });
  }
};

const searchUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const searchedUser = await User.findById(userId);
    if (!searchedUser) {
      return res
        .status(404)
        .json({ status: "failed", msg: `No user with id : ${userId}` });
    }
    res.status(200).json({
      status: "success",
      data: searchedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      data: null,
      msg: error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      status: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      data: null,
      msg: error,
    });
  }
};

module.exports = {
  addUser,
  editUser,
  deleteUser,
  searchUser,
  getAllUsers,
};
