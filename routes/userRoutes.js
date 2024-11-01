const express = require("express");
const {
  RegisterUser,
  AdminGetAllUser,
  DeleteUserBooking,
  DeleteAdminAccount,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Login route and register for admin
router.post("/user/register", RegisterUser);
router.get("/admin/getalluser", protect, AdminGetAllUser);
router.delete("/admin/deleteadmin/:id", protect, DeleteUserBooking);
router.delete("/admin/deleteadminaccount/:id", protect, DeleteAdminAccount);

module.exports = router;
