const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctor_id: {
    type: Number,
    required: [true, "Please provide doctor id"],
  },
  doctor_name: {
    type: String,
    required: [true, "Please provide doctor name"],
  },
  doctor_specialist: {
    type: String,
    required: [true, "Please provide doctor speciality"],
  },
  doctor_mobile: {
    type: String,
    required: [true, "Please provide doctor mobile number"],
  },
  doctor_email: {
    type: String,
    required: [true, "Please provide doctor email"],
  },
  doctor_password: {
    type: String,
    required: [true, "Please provide doctor password"],
  },
  doctor_address: {
    type: String,
    required: [true, "Please provide doctor address"],
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
