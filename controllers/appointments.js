const Appointment = require("../models/appointmentModel");

const addAppointment = async (req, res) => {
  try {
    const doc = await Appointment.create(req.body);
    res.status(201).json({ doc });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error });
  }
};

const editAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const doc = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        appointment_id: req.body.appointment_id,
        appointment_doctor_id: req.body.appointment_doctor_id,
        appointment_number: req.body.appointment_email,
        appointment_type: req.body.appointment_type,
        appointment_date: req.body.appointment_date,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No appointment found with id : ${appointmentId}`,
      });
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      error,
    });
  }
};

const deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const doc = await Appointment.findByIdAndDelete(appointmentId);
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No appointment found with id : ${appointmentId}`,
      });
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      data: null,
      msg: error,
    });
  }
};

const searchAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  try {
    const doc = await Appointment.findById(appointmentId);
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No appointment found with id : ${appointmentId}`,
      });
    }
    res.status(200).json({
      status: "success",
      data: doc,
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
  addAppointment,
  editAppointment,
  deleteAppointment,
  searchAppointment,
};
