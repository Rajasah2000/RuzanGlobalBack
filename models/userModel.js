const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
      unique: true, // Ensures each number is unique
    },
    description: {
      type: String,
      required: true,
    },
    numberofstar: {
      type: String,
      required: true,
    },
    registeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin", // Reference to the Admin who registered the user
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
