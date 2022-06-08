const express = require("express");
const {
  signup,
  login,
  logout,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth");
const {
  addUser,
  editUser,
  deleteUser,
  searchUser,
  getAllUsers,
} = require("../controllers/user");

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);

router.route("/forgetPassword").post(forgotPassword);
router.route("/resetPassword/:token").patch(resetPassword);

// --- protecting next routes via this middleware
router.use(protect);

// --- admin privileged routes ---
router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(searchUser).patch(editUser).delete(deleteUser);

module.exports = router;
