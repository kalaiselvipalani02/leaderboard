const User = require("../models/User");
const History = require("../models/History");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new user
exports.addUser = async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Error adding user" });
  }
};

// Leaderboard - sorted by totalPoints
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error getting leaderboard" });
  }
};

// Get history for a specific user
exports.getUserHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await History.find({ userId }).sort({ claimedAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Error fetching history" });
  }
};
