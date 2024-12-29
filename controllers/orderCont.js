const Order = require("../models/modelOrder");

// Create Order API Function
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body); // Use the imported Order model
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Orders API Function
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ status: true, data: orders });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

// Get Single Order by ID API Function
const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Order by ID API Function
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ status: flase, message: "Order not found" });
    res
      .status(200)
      .json({ status: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getAllOrders, getSingleOrder, deleteOrder };
