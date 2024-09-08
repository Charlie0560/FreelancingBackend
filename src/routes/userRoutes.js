const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

// Get all users
router.get('/', userController.getAllUsers);

// Create a new user
router.post('/', userController.createUser);

// Update an existing user
router.put('/:id', userController.updateUser);

// Get a user by ID
router.get('/:id', userController.getUserById);

// Route for user login
router.post('/login', userController.loginUser);


// Route for user logout
router.post('/logout', userController.logoutUser);

module.exports = router;
