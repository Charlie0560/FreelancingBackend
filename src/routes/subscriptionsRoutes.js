const express = require('express');
const router = express.Router();
const subscriptionController = require('../controller/subscriptionsController');

// Get all subscriptions
router.get('/', subscriptionController.getAllSubscriptions);

// Create a new subscription
router.post('/', subscriptionController.createSubscription);

// Update an existing subscription
router.put('/:id', subscriptionController.updateSubscription);

// Get a subscription by ID
router.get('/:id', subscriptionController.getSubscriptionById);

// Get a subscription by user ID
router.get('/user/:id', subscriptionController.getSubscriptionByuserId);

// Delete a subscription by ID
router.delete('/:id', subscriptionController.deleteSubscription);

module.exports = router;
