// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // To load environment variables from .env file

// Initialize the app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Database connection
mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Database connection error:', error));

// Import routes
const userRoutes = require('./src/routes/userRoutes');
const planRoutes = require('./src/routes/plansRoutes');
const subscriptionRoutes = require('./src/routes/subscriptionsRoutes');
const userController = require('./src/controller/userController')

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/subscription', subscriptionRoutes);

app.get('/api/protected', userController.isTokenBlacklisted, (req, res) => {
  res.json({ message: 'This is a protected route' });
});

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});


// Sample route
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js Backend!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
