const Nurse = require("../models/nurseModel");

const addNurse = async (req, res) => {
  try {
    const doc = await Nurse.create(req.body);
    res.status(201).json({ doc });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error });
  }
};

const editNurse = async (req, res) => {
  const nurseId = req.params.id;
  try {
    const doc = await Nurse.findByIdAndUpdate(
      nurseId,
      {
        nurse_name: req.body.nurse_name,
        nurse_mobile: req.body.nurse_mobile,
        nurse_email: req.body.nurse_email,
        nurse_duty_hour: req.body.nurse_duty_hour,
      },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No nurse found with id : ${nurseId}`,
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

const deleteNurse = async (req, res) => {
  const nurseId = req.params.id;
  try {
    const doc = await Nurse.findByIdAndDelete(nurseId);
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No nurse found with id : ${nurseId}`,
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

const searchNurse = async (req, res) => {
  const nurseId = req.params.id;
  try {
    const doc = await Nurse.findById(nurseId);
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No nurse found with id : ${nurseId}`,
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
  addNurse,
  editNurse,
  deleteNurse,
  searchNurse,
};
