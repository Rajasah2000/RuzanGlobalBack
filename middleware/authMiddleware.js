const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   //   console.log(req.headers.authorization?.split(" ")[1]);

//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Not authorized, invalid token" });
//   }
// };

// module.exports = protect;

// const jwt = require("jsonwebtoken");

// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: "Not authorized, token missing" });
//   }
//   // console.log(token);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log(decoded);

//     req.adminId = decoded.id; // Attach admin ID to request
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Not authorized, invalid token" });
//   }
// };

// module.exports = protect;

// const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Check for token in "Bearer <token>" format
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Not authorized, token missing or malformed" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token part after "Bearer "

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id; // Attach admin ID to request
    next();
  } catch (error) {
    console.error("Token verification failed:", error); // Log the error for debugging
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

module.exports = protect;
