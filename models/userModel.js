const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const mongooseDateFormat = require("mongoose-date-format");

const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: [true, "Please provide a user id"],
  },
  user_name: {
    type: String,
    required: [true, "Please provide your name!"],
  },
  user_email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email!"],
    unique: true,
    trim: true,
  },
  user_password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  user_address: {
    type: String,
    required: [true, "Please provide your address"],
  },
  user_dob: {
    type: Date,
    required: [true, "Please provide your date of birth"],
    default: Date.now(),
  },
  user_role: {
    type: String,
    required: [true, "Please provide user role"],
    enum: ["user", "admin", "staff"],
    default: "user",
  },
  user_role_description: {
    type: String,
    required: [true, "Please provide role description"],
  },
});

// format: YYYY-MM-DD HH:mm:ss
userSchema.plugin(mongooseDateFormat);

userSchema.pre("save", async function (next) {
  // Hashing the password
  this.user_password = await bcrypt.hash(this.user_password, 12);
  next();
});

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
