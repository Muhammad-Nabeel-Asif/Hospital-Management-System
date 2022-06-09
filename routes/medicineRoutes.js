const express = require("express");

const { protect, restrictTo } = require("../controllers/auth");
const {
  addMedicine,
  editMedicine,
  deleteMedicine,
  searchMedicine,
} = require("../controllers/medicines");

const router = express.Router();

// --- protecting next routes via this middleware
router.use(protect);

// --- admin, user & staff privileged routes ---
router.use(restrictTo("admin", "user", "staff"));

router.route("/").post(addMedicine);
router
  .route("/:id")
  .get(searchMedicine)
  .patch(editMedicine)
  .delete(deleteMedicine);

module.exports = router;
