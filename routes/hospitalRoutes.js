const express = require("express");
const {
  addHospital,
  editHospital,
  deleteHospital,
  searchHospital,
} = require("../controllers/hospitals");

const router = express.Router();

router.route("/").post(addHospital);
router
  .route("/:id")
  .get(searchHospital)
  .patch(editHospital)
  .delete(deleteHospital);

module.exports = router;
