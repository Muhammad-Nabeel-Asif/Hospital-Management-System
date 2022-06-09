const mongoose = require("mongoose");
const mongooseDateFormat = require("mongoose-date-format");

const appointmentSchema = new mongoose.Schema({
  appointment_id: {
    type: Number,
    required: [true, "Please provide appointment id"],
  },
  appointment_doctor_id: {
    type: Number,
    required: [true, "Please provide appointment doctor id"],
  },
  appointment_number: {
    type: Number,
    required: [true, "Please provide appointment number"],
  },
  appointment_type: {
    type: String,
    required: [true, "Please provide appointment type"],
  },
  appointment_date: {
    type: Date,
    required: [true, "Please provide appointment Date in format: YYYY-MM-DD"],
    default: Date.now(),
  },
  appointment_description: {
    type: String,
    required: [true, "Please provide appointment description"],
  },
});

// format: YYYY-MM-DD HH:mm:ss
appointmentSchema.plugin(mongooseDateFormat);

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
