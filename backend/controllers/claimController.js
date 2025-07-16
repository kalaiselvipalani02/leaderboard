const User = require("../models/User");
const History = require("../models/History");

// Claim random points (1 to 10)
exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    const randomPoints = Math.floor(Math.random() * 10) + 1;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Update user's totalPoints
    user.totalPoints += randomPoints;
    await user.save();


    // Create claim history entry
    const history = new History({
      userId,
      points: randomPoints,
    });
    await history.save();

    res.json({
      message: `Awarded ${randomPoints} points to ${user.name}`,
      totalPoints: user.totalPoints,
      claimedPoints: randomPoints,
    });
  } catch (err) {
    res.status(500).json({ error: "Error claiming points" });
  }
};
