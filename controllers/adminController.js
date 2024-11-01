const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Admin = require("../models/adminModel");

// Admin Register function

const adminRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword });

    await newAdmin.save();

    // Generate JWT with admin ID
    const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      msg: "Registered successfully",
      status: true,
      token, // Return token to use for authentication
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", status: false });
  }
};

// Admin login function
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ msg: "Admin not found", status: false });
    }

    // Check if admin is blocked
    if (admin.status === "blocked") {
      return res
        .status(403)
        .json({ msg: "Your account is blocked by super admin", status: false });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid password", status: false });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      msg: "Login Successful",
      status: true,
      data: admin,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", status: false });
  }
};

// Get All Admin  function
const getAllRegisteredUsers = async (req, res) => {
  try {
    const users = await Admin.find(); // Fetch all admins
    res.status(200).json({ status: true, data: users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", status: false });
  }
};

// Delete User by ID function
const deleteUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Admin.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ msg: "User not found", status: false });
    }
    res.status(200).json({ msg: "User deleted successfully", status: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", status: false });
  }
};

// Block or Unblock Admin API
const toggleAdminStatus = async (req, res) => {
  const { adminId, action } = req.body; // adminId to toggle, action is either 'block' or 'unblock'
  console.log(adminId, action);

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found", status: false });
    }

    admin.status = action === "block" ? "blocked" : "active";
    await admin.save();

    res.status(200).json({
      msg: `Admin successfully ${action === "block" ? "blocked" : "unblocked"}`,
      status: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error", status: false });
  }
};

module.exports = {
  adminLogin,
  adminRegister,
  getAllRegisteredUsers,
  deleteUserById,
  toggleAdminStatus,
};
