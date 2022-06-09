const express = require("express");

const { protect, restrictTo } = require("../controllers/auth");
const {
  addNurse,
  editNurse,
  deleteNurse,
  searchNurse,
} = require("../controllers/nurses");
const router = express.Router();

// --- protecting next routes via this middleware
router.use(protect);

// --- admin & user privileged routes ---
router.use(restrictTo("admin", "user"));

router.route("/").post(addNurse);
router.route("/:id").get(searchNurse).patch(editNurse).delete(deleteNurse);

module.exports = router;
