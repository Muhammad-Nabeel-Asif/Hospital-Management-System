const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  patient_id: {
    type: Number,
    required: [true, "Please provide patient id"],
  },
  patient_mobile: {
    type: String,
    required: [true, "Please provide patient mobile number"],
  },
  patient_email: {
    type: String,
    required: [true, "Please provide patient email"],
  },
  patient_password: {
    type: String,
    required: [true, "Please provide patient password"],
  },
  patient_address: {
    type: String,
    required: [true, "Please provide patient address"],
  },
  patient_name: {
    type: String,
    required: [true, "Please provide patient name"],
    unique: true,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
