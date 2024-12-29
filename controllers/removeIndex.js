const mongoose = require("mongoose");

const User = require("../models/userModel"); // Adjust this path based on your project structure

const removeUniqueIndex = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected");

    // List all current indexes
    const indexes = await User.collection.getIndexes();
    console.log("Current Indexes:", indexes);

    // Remove the unique index on the `number` field if it exists
    if (indexes["number_1"]) {
      await User.collection.dropIndex("number_1");
      console.log("Unique index on 'number' field removed.");
    } else {
      console.log("No unique index found on 'number' field.");
    }

    mongoose.connection.close();
  } catch (error) {
    console.error("Error removing index:", error);
  }
};

removeUniqueIndex();
