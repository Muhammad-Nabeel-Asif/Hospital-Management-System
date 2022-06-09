const express = require("express");

const { protect, restrictTo } = require("../controllers/auth");
const {
  addAppointment,
  editAppointment,
  deleteAppointment,
  searchAppointment,
} = require("../controllers/appointments");
const router = express.Router();

// --- protecting next routes via this middleware
router.use(protect);

// --- admin, user & staff privileged routes ---
router.use(restrictTo("admin", "user", "staff"));

router.route("/").post(addAppointment);
router
  .route("/:id")
  .get(searchAppointment)
  .patch(editAppointment)
  .delete(deleteAppointment);

module.exports = router;
