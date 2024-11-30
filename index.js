// const express = require("express");
// const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// const cors = require("cors");

// const adminRoutes = require("./routes/adminRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const productRoutes = require("./routes/productRoutes");
// const userRoutes = require("./routes/userRoutes");

// dotenv.config();

// const app = express();
// connectDB();

// // Enable CORS for all routes
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://yourfrontenddomain.com"], // Replace with your frontend domains
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // Handle preflight requests
// app.options("*", cors());

// // Middleware to parse JSON requests
// app.use(express.json());

// // All Routes
// app.use("/api/admin", adminRoutes);
// app.use("/api/admin/category", categoryRoutes);
// app.use("/api/admin/products", productRoutes);
// app.use("/api", userRoutes);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });

// // Start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");

const adminRoutes = require("./routes/adminRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

const app = express();
connectDB();

// Enable CORS for all routes with updated configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      // "http://13.232.149.165:3000",
      "http://13.232.230.107:3000",
      "http://ruzanglobal.com",
      "https://ruzanglobal.com",
    ], // Replace with your frontend domains
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
app.use("/api/admin/products", productRoutes);
app.use("/api", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
