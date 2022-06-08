const Hospital = require("../models/hospitalModel");

const addHospital = async (req, res) => {
  try {
    const doc = await Hospital.create(req.body);
    res.status(201).json({ doc });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error });
  }
};

const editHospital = async (req, res) => {
  const hospitalId = req.params.id;
  const newData = req.body;
  try {
    const doc = await Hospital.findByIdAndUpdate(
      hospitalId,
      { newData },
      {
        runValidators: true,
        new: true,
      }
    );
    if (!doc) {
      return res
        .status(404)
        .json({ status: "failed", msg: `No hospital with id : ${hospitalId}` });
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

const deleteHospital = async (req, res) => {
  const hospitalId = req.params.id;
  try {
    const doc = await Hospital.findByIdAndDelete(hospitalId);
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No hospital found with id : ${hospitalId}`,
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

const searchHospital = async (req, res) => {
  const hospitalId = req.params.id;
  try {
    const doc = await Hospital.findById(hospitalId);
    if (!doc) {
      return res
        .status(404)
        .json({ status: "failed", msg: `No hospital with id : ${hospitalId}` });
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
  addHospital,
  editHospital,
  deleteHospital,
  searchHospital,
};
