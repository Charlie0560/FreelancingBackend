const Subscription = require('../models/subscriptions');
const User = require('../models/user');
const Plan = require('../models/plans');

// Helper function to fetch user and plan details
async function getUserAndPlanDetails(userId, planId) {
  const user = await User.findOne({ _id: userId });
  const plan = await Plan.findOne({ _id: planId });

  return {
    user: user ? { id: user._id, name: user.name, email: user.email } : null,
    plan: plan 
  };
}

// Get all subscriptions
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find();

    // Fetch user and plan details for each subscription
    const detailedSubscriptions = await Promise.all(subscriptions.map(async (sub) => {
      const details = await getUserAndPlanDetails(sub.user_id, sub.plan_id);
      return { ...sub.toObject(), ...details };
    }));

    res.json(detailedSubscriptions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscriptions', error: error.message });
  }
};

// Create a new subscription
exports.createSubscription = async (req, res) => {
  try {
    const {
      user_id,
      plan_id,
      status,
      subscriptionDate,
      amount,
      responsive,
      basePrice,
      pricePerPage,
      extraPages
    } = req.body;

   

    // Create a new subscription instance
    const newSubscription = new Subscription({
      user_id,
      plan_id,
      status,
      subscriptionDate,
      amount,
      responsive,
      basePrice,
      pricePerPage,
      extraPages
    });

    // Save the subscription to the database
    await newSubscription.save();

    // Fetch user and plan details
    const details = await getUserAndPlanDetails(user_id, plan_id);

    res.status(201).json({ message: 'Subscription created successfully', subscription: { ...newSubscription.toObject(), ...details } });
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: 'Error creating subscription', error: error.message });
  }
};

// Update an existing subscription
exports.updateSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;
    const {
      user_id,
      plan_id,
      status,
      startDate,
      endDate,
      amount,
      responsive,
    } = req.body;

    // Find the subscription by ID
    const subscription = await Subscription.findOne({ _id: subscriptionId });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Update subscription fields
    subscription.user_id = user_id || subscription.user_id;
    subscription.plan_id = plan_id || subscription.plan_id;
    subscription.status = status || subscription.status;
    subscription.startDate = startDate || subscription.startDate;
    subscription.endDate = endDate || subscription.endDate;
    subscription.amount = amount || subscription.amount;
    subscription.responsive = responsive !== undefined ? responsive : subscription.responsive;

    // Save the updated subscription
    await subscription.save();

    // Fetch user and plan details
    const details = await getUserAndPlanDetails(subscription.user_id, subscription.plan_id);

    res.json({ message: 'Subscription updated successfully', subscription: { ...subscription.toObject(), ...details } });
  } catch (error) {
    res.status(400).json({ message: 'Error updating subscription', error: error.message });
  }
};

// Fetch a single subscription by ID
exports.getSubscriptionById = async (req, res) => {
  try {
    const subscriptionId = req.params.id;

    // Find the subscription by ID
    const subscription = await Subscription.findOne({ _id: subscriptionId });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    // Fetch user and plan details
    const details = await getUserAndPlanDetails(subscription.user_id, subscription.plan_id);

    res.json({ ...subscription.toObject(), ...details });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription', error: error.message });
  }
};
// Fetch subscriptoins by user ID
exports.getSubscriptionByuserId = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the subscription by ID
    const subscriptions = await Subscription.find({ user_id: userId });
    if (!subscriptions) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const subscriptionsWithDetails = await Promise.all(subscriptions.map(async (subscription) => {
        const details = await getUserAndPlanDetails(userId, subscription.plan_id);
        return { ...subscription.toObject(), ...details };
      }));
  
      res.json(subscriptionsWithDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription', error: error.message });
  }
};

// Delete a subscription by ID
exports.deleteSubscription = async (req, res) => {
  try {
    const subscriptionId = req.params.id;

    // Find the subscription by ID and delete it
    const subscription = await Subscription.findOneAndDelete({ _id: subscriptionId });
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscription', error: error.message });
  }
};
