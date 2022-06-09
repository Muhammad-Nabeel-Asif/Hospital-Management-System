const Medicine = require("../models/medicineModel");

const addMedicine = async (req, res) => {
  try {
    const doc = await Medicine.create(req.body);
    res.status(201).json({ doc });
  } catch (error) {
    res.status(500).json({ status: "failed", msg: error });
  }
};

const editMedicine = async (req, res) => {
  const medicineId = req.params.id;
  try {
    const doc = await Medicine.findByIdAndUpdate(medicineId, req.body, {
      runValidators: true,
      new: true,
    });
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No medicine found with id : ${medicineId}`,
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

const deleteMedicine = async (req, res) => {
  const medicineId = req.params.id;
  try {
    const doc = await Medicine.findByIdAndDelete(medicineId);
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No medicine found with id : ${medicineId}`,
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

const searchMedicine = async (req, res) => {
  const medicineId = req.params.id;
  try {
    const doc = await Medicine.findById(medicineId);
    if (!doc) {
      return res.status(404).json({
        status: "failed",
        msg: `No appointment found with id : ${medicineId}`,
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
  addMedicine,
  editMedicine,
  deleteMedicine,
  searchMedicine,
};
