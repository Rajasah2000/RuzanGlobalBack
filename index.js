const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const orderRoutes = require("./routes/orderRout");
// const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
connectDB();

// Enable CORS for all routes with updated configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local development frontend
      "http://3.111.171.1:3000", // Production IP of the frontend
      "https://api.ruzanglobal.com", // API subdomain
      "http://ruzanglobal.com", // Main domain (HTTP)
      "https://ruzanglobal.com", // Main domain (HTTPS)
      "https://www.ruzanglobal.com", // With `www` if it is being used
    ],

    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Required for cookies and auth headers
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/category", categoryRoutes);
// app.use("/api/admin/products", productRoutes);
app.use("/api/user/order", orderRoutes);
app.use("/api/user/contact", contactRoutes);
app.use("/api", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//  Server End
