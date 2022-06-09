const Doctor = require("../models/doctorModel");

const addDoctor = async (req, res) => {
  try {
    const doc = await Doctor.create(req.body);
    res.status(201).json({ doc });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error });
  }
};

const editDoctor = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doc = await Doctor.findByIdAndUpdate(doctorId, req.body, {
      runValidators: true,
      new: true,
    });
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No doctor found with id : ${doctorId}`,
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

const deleteDoctor = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doc = await Doctor.findByIdAndDelete(doctorId);
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No doctor found with id : ${doctorId}`,
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

const searchDoctor = async (req, res) => {
  const doctorId = req.params.id;
  try {
    const doc = await Doctor.findById(doctorId);
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No doctor found with id : ${doctorId}`,
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
  addDoctor,
  editDoctor,
  deleteDoctor,
  searchDoctor,
};
