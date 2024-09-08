const express = require('express');
const router = express.Router();
const planController = require('../controller/plansController');

// Get all plans
router.get('/', planController.getAllPlans);

// Create a new plan
router.post('/', planController.createPlan);

// Update an existing plan
router.put('/:id', planController.updatePlan);

// Get a plan by ID
router.get('/:id', planController.getPlanById);

// Delete a plan by ID
router.delete('/:id', planController.deletePlan);

module.exports = router;
