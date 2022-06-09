const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  hospital_id: {
    type: Number,
    required: [true, "Please provide hospital id"],
    unique: true,
  },
  hospital_doctor_id: {
    type: Number,
    required: [true, "Please provide hospital doctor id"],
  },
  hospital_name: {
    type: String,
    required: [true, "Please provide hospital name"],
  },
  hospital_place: {
    type: String,
    required: [true, "Please provide hospital place"],
  },
  hospital_type: {
    type: String,
    required: [true, "Please provide hospital type"],
  },
  hospital_description: {
    type: String,
    required: [true, "Please provide hospital description"],
  },
  hospital_address: {
    type: String,
    required: [true, "Please provide hospital address"],
  },
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
