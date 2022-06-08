const Patient = require("../models/patientModel");

const addPatient = async (req, res) => {
  try {
    const doc = await Patient.create(req.body);
    res.status(201).json({ doc });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error });
  }
};

const editPatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    const doc = await Patient.findByIdAndUpdate(
      patientId,
      {
        patient_email: req.body.patient_email,
        patient_mobile: req.body.patient_mobile,
        patient_name: req.body.patient_name,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No patient found with id : ${patientId}`,
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

const deletePatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    const doc = await Patient.findByIdAndDelete(patientId);
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No patient found with id : ${patientId}`,
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

const searchPatient = async (req, res) => {
  const patientId = req.params.id;
  try {
    const doc = await Patient.findById(patientId);
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No patient found with id : ${patientId}`,
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
  addPatient,
  editPatient,
  deletePatient,
  searchPatient,
};
