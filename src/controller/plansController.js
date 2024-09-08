const Plan = require('../models/plans');

// Get all plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plans', error: error.message });
  }
};

// Create a new plan
exports.createPlan = async (req, res) => {
  try {
    const {
      name,
      panel,
      description,
      features,
      price,
      rate_per_page,
      responsive_rate,
      default_pages,
    } = req.body;


    // Create a new plan instance
    const newPlan = new Plan({
      name,
      panel,
      description,
      features,
      price,
      rate_per_page,
      responsive_rate,
      default_pages,
    });

    // Save the plan to the database
    await newPlan.save();

    res.status(201).json({ message: 'Plan created successfully', plan: newPlan });
  } catch (error) {
    res.status(400).json({ message: 'Error creating plan', error: error.message });
  }
};

// Update an existing plan
exports.updatePlan = async (req, res) => {
  try {
    const planId = req.params.id;
    const {
      name,
      panel,
      description,
      features,
      price,
      rate_per_page,
      responsive_rate,
      default_pages,
    } = req.body;

    // Find the plan by ID
    const plan = await Plan.findOne({ id: planId });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    // Update plan fields
    plan.name = name || plan.name;
    plan.panel = panel || plan.panel;
    plan.description = description || plan.description;
    plan.features = features || plan.features;
    plan.price = price || plan.price;
    plan.rate_per_page = rate_per_page || plan.rate_per_page;
    plan.responsive_rate = responsive_rate || plan.responsive_rate;
    plan.default_pages = default_pages || plan.default_pages;

    // Save the updated plan
    await plan.save();

    res.json({ message: 'Plan updated successfully', plan });
  } catch (error) {
    res.status(400).json({ message: 'Error updating plan', error: error.message });
  }
};

// Fetch a single plan by ID
exports.getPlanById = async (req, res) => {
  try {
    const planId = req.params.id;

    // Find the plan by ID
    const plan = await Plan.findOne({ id: planId });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching plan', error: error.message });
  }
};

// Delete a plan by ID
exports.deletePlan = async (req, res) => {
  try {
    const planId = req.params.id;

    // Find the plan by ID and delete it
    const plan = await Plan.findOneAndDelete({ _id: planId });
    if (!plan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.json({ message: 'Plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plan', error: error.message });
  }
};
