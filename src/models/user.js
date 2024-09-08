const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the UUID function

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4, // Automatically generate a UUID for each new plan
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Email is not valid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Compile the schema into a model and export it
const User = mongoose.model("User", userSchema);
module.exports = User;
