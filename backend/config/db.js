const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });

    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log("Mongoose connection closed due to app termination");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    if (error.name === "MongoNetworkError") {
      console.error("Network error. Check MongoDB server.");
    } else if (error.name === "MongooseServerSelectionError") {
      console.error("Server selection error. Check MongoDB URI.");
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

module.exports = connectDB;
