const express = require("express");
const router = express.Router();
const {
  adminLogin,
  adminRegister,
  getAllRegisteredUsers,
  toggleAdminStatus,
} = require("../controllers/adminController");
const { DeleteUserBooking } = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

// Login route and register for admins dd ds d ds
router.post("/register", adminRegister);
router.post("/login", adminLogin);
router.get("/allregisteruser", protect, getAllRegisteredUsers);
router.delete(`/deleteuserbyadmin/:id`, protect, DeleteUserBooking);
router.post("/togglestatus/:id", toggleAdminStatus);

module.exports = router;
