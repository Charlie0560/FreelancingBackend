const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // To generate unique identifiers

// Define the Subscription schema
const subscriptionSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4, // Automatically generate a UUID for each subscription
    unique: true
  },
  user_id: {
    type: String,
    required: [true, 'User ID is required'],
    trim: true,
  },
  plan_id: {
    type: String,
    required: [true, 'Plan ID is required'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Cancelled','Pending'],
    default: 'Active',
  },
  subscriptionDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0, 'Amount cannot be negative'],
  },
  responsive: {
    type: Boolean,
    default: false,
  },
  basePrice: {
    type:Number,
    required: [true, 'Base Price required'],
  },
  pricePerPage:{
    type:Number,
    required: [true, 'Price per page required'],
  },
  extraPages:{
    type:Number,
    default: 0
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Compile the schema into a model and export it
const Subscription = mongoose.model('Subscription', subscriptionSchema);
module.exports = Subscription;
