const express = require("express");
const {
  addDoctor,
  editDoctor,
  deleteDoctor,
  searchDoctor,
} = require("../controllers/doctors");
const router = express.Router();

router.route("/").post(addDoctor);
router.route("/:id").get(searchDoctor).patch(editDoctor).delete(deleteDoctor);

module.exports = router;
