const express = require("express");
const router = express.Router();
const { claimPoints } = require("../controllers/claimController");

// POST claim points for a user
router.post("/:userId", claimPoints);

module.exports = router;
