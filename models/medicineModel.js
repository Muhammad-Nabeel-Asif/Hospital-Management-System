const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema({
  medicine_id: {
    type: Number,
    required: [true, "Please provide medicine id"],
  },
  medicine_name: {
    type: String,
    required: [true, "Please provide medicine name"],
  },
  medicine_company: {
    type: String,
    required: [true, "Please provide medicine company"],
  },
  medicine_composition: {
    type: String,
    required: [true, "Please provide medicine composition"],
  },
  medicine_cost: {
    type: String,
    required: [true, "Please provide medicine cost"],
  },
  medicine_type: {
    type: String,
    required: [true, "Please provide medicine type"],
  },
  medicine_dose: {
    type: String,
    required: [true, "Please provide medicine dose"],
  },
  medicine_description: {
    type: String,
    required: [true, "Please provide medicine description"],
  },
});

const Medicine = mongoose.model("Medicine", medicineSchema);

module.exports = Medicine;
