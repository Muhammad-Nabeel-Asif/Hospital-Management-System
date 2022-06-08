const express = require("express");
const {
  addPatient,
  editPatient,
  deletePatient,
  searchPatient,
} = require("../controllers/patients");
const router = express.Router();

router.route("/").post(addPatient);
router
  .route("/:id")
  .get(searchPatient)
  .patch(editPatient)
  .delete(deletePatient);

module.exports = router;
