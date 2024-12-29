const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userDetails: {
      companyName: { type: String },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      country: { type: String, required: true },
      streetAddress: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      orderNotes: { type: String },
      shipToDifferent: { type: Boolean, required: true },
    },
    product: {
      title: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      originalPrice: { type: Number, required: true },
      // image: { type: String, required: true },
    },
    method: { type: String, enum: ["online", "cash"], required: true },
    total: { type: Number, required: true },
    quantity: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
