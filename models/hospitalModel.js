const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide hospital name"],
  },
  type: {
    type: String,
    required: [true, "Please provide hospital type"],
  },
  description: {
    type: String,
    required: [true, "Please provide hospital description"],
  },
  place: {
    type: String,
    required: [true, "Please provide hospital place"],
  },
  address: {
    type: String,
    required: [true, "Please provide hospital address"],
  },
  doctor_id: {
    type: Number,
    required: [true, "Please provide doctor id"],
  },
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
