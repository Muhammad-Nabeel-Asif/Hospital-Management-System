const mongoose = require("mongoose");

const nurseSchema = new mongoose.Schema({
  nurse_id: {
    type: Number,
    required: [true, "Please provide nurse id"],
  },
  nurse_name: {
    type: String,
    required: [true, "Please provide nurse name"],
  },
  nurse_duty_hour: {
    type: Number,
    required: [true, "Please provide nurse duty hours"],
  },
  nurse_email: {
    type: String,
    required: [true, "Please provide nurse email"],
  },
  nurse_mobile: {
    type: String,
    required: [true, "Please provide nurse mobile number"],
  },
  nurse_password: {
    type: String,
    required: [true, "Please provide nurse password"],
  },
  nurse_address: {
    type: String,
    required: [true, "Please provide nurse address"],
  },
});

const Nurse = mongoose.model("Nurse", nurseSchema);

module.exports = Nurse;
