const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const mongooseDateFormat = require("mongoose-date-format");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  address: {
    type: String,
    required: [true, "Please provide your address"],
  },
  dob: {
    type: Date,
    required: [true, "Please provide your date of birth"],
  },
  role: {
    type: String,
    enum: ["user", "admin", "staff"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
});

// format: YYYY-MM-DD HH:mm:ss
userSchema.plugin(mongooseDateFormat);

userSchema.pre("save", async function (next) {
  // Hashing the password
  this.password = await bcrypt.hash(this.password, 12);
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
