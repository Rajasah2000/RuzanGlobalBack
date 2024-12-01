const Admin = require("../models/adminModel");
const User = require("../models/userModel");

// const RegisterUser = async (req, res) => {
//   const number = req.body.number;

//   // Check if the user already exists
//   const findnumber = await User.findOne({ number: number });

//   if (!findnumber) {
//     // Add current date to user data
//     const newUser = await User.create({
//       ...req.body,
//       createdAt: Date.now(), // Set today's date
//     });

//     res.send({
//       msg: "Submitted successfully",
//       status: true,
//       data: newUser,
//     });
//   } else {
//     res.send({
//       msg: "User already exists",
//       status: false,
//     });
//   }
// };
const RegisterUser = async (req, res) => {
  const { name, number, description, numberofstar, registeredBy } = req.body;

  try {
    // Check if the user with the same number already exists under the same admin (registeredBy)
    // const existingUser = await User.findOne({ number, registeredBy });

    // if (existingUser) {
    //   return res.status(400).json({
    //     msg: "User already exists",
    //     status: false,
    //   });
    // }

    // Register new user and associate with the logged-in admin
    const newUser = await User.create({
      name,
      number,
      description,
      numberofstar,
      registeredBy, // Link user to the admin ID
    });

    res.status(201).json({
      msg: "User registered successfully",
      status: true,
      data: newUser,
    });
    // console.log("pk", res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", status: false });
  }
};

// const AdminGetAllUser = async (req, res) => {
//   try {
//     const users = await User.find(); // Fetch all users from the User collection
//     res.status(200).json({
//       status: true,
//       data: users,
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: false,
//       msg: "Failed to fetch users",
//       error: error.message,
//     });
//   }
// };
const AdminGetAllUser = async (req, res) => {
  try {
    const users = await User.find({ registeredBy: req.adminId }); // Filter by admin ID
    res.status(200).json({
      status: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Failed to fetch users", status: false });
  }
};

const DeleteUserBooking = async (req, res) => {
  const { id } = req.params; // Destructure id from req.params

  try {
    const user = await User.findByIdAndDelete(id); // Delete the user by ID

    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "User not found",
      });
    }

    res.status(200).json({
      status: true,
      msg: "Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting user:", error); // Log the error for debugging
    res.status(500).json({
      status: false,
      msg: "Failed to delete user data",
      error: error.message,
    });
  }
};

const DeleteAdminAccount = async (req, res) => {
  const { id } = req.params; // Destructure id from req.params

  try {
    const user = await Admin.findByIdAndDelete(id); // Delete the user by ID

    if (!user) {
      return res.status(404).json({
        status: false,
        msg: "Admin not found",
      });
    }

    res.status(200).json({
      status: true,
      msg: "Deleted Successfully",
    });
  } catch (error) {
    console.error("Error deleting admin:", error); // Log the error for debugging
    res.status(500).json({
      status: false,
      msg: "Failed to delete user data",
      error: error.message,
    });
  }
};

module.exports = {
  RegisterUser,
  AdminGetAllUser,
  DeleteUserBooking,
  DeleteAdminAccount,
};
