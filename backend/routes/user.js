const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  addUser,
  getLeaderboard,
  getUserHistory,
} = require("../controllers/userController");

// GET all users
router.get("/", getAllUsers);

// POST add new user
router.post("/", addUser);

// GET leaderboard
router.get("/leaderboard", getLeaderboard);

// GET claim history for user
router.get("/:userId/history", getUserHistory);

module.exports = router;
