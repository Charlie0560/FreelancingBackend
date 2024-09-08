const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); // Import the UUID function

// Define the Plan schema
const planSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4, // Automatically generate a UUID for each new plan
    },
    name: {
      type: String,
      required: [true, "Plan name is required"],
      trim: true,
    },
    panel: {
      type: String,
      required: [true, "Panel type is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    features: {
      type: String,
      required: [true, "Features are required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    rate_per_page: {
      type: Number,
      required: [true, "Rate per page is required"],
      min: [0, "Rate per page cannot be negative"],
    },
    responsive_rate: {
      type: Number,
      required: [true, "Responsive rate is required"],
      min: [0, "Responsive rate cannot be negative"],
    },
    default_pages: {
      type: Number,
      required: [true, "Default pages are required"],
      min: [1, "There must be at least one default page"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Compile the schema into a model and export it
const Plan = mongoose.model("Plan", planSchema);
module.exports = Plan;
