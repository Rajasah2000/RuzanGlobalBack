const express = require("express");
const {
  createOrder,
  getAllOrders,
  deleteOrder,
} = require("../controllers/orderCont");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

// Login route for admin
router.post("/add", createOrder);
router.get("/get", getAllOrders);
// router.put(`/update/:id`, protect, UpdateCategory);
router.delete("/delete/:id", deleteOrder);
module.exports = router;
