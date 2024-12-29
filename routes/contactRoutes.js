const express = require("express");

const protect = require("../middleware/authMiddleware");
const {
  addContact,
  getAllContacts,
  deleteContact,
} = require("../controllers/contactController");
const router = express.Router();

// Login route for admin
router.post("/add", addContact);
router.get("/get", getAllContacts);
// router.put(`/update/:id`, protect, UpdateCategory);
router.delete("/delete/:id", deleteContact);
module.exports = router;
