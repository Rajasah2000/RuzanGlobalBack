const express = require("express");
const router = express.Router();

// Login route for admin
router.post("/add", createOrder);
router.get("/get", protect, getAllOrders);
// router.put(`/update/:id`, protect, UpdateCategory);
router.delete("/delete/:id", protect, deleteOrder);
module.exports = router;
