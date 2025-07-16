const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const User = require("./models/User");
const History = require("./models/History");

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    seedAll();
  })
  .catch((err) => console.error("DB connection error:", err));

const users = [
  { name: "Rahul" },
  { name: "Kamal" },
  { name: "Sanak" },
  { name: "Anita" },
  { name: "Ravi" },
  { name: "Divya" },
  { name: "Sundar" },
  { name: "Lakshmi" },
  { name: "Meena" },
  { name: "Arun" },
];

// Generate a random date within the past 7 days
function randomDate() {
  const now = new Date();
  const past = new Date(
    now.getTime() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
  );
  return past;
}

// Main seeding function
async function seedAll() {
  try {
    await User.deleteMany();
    await History.deleteMany();

    const insertedUsers = await User.insertMany(users);
    console.log(`Inserted ${insertedUsers.length} users.`);

    const historyData = [];

    // For each user, create 3 fake claim histories
    for (let user of insertedUsers) {
      let totalPoints = 0;

      for (let i = 0; i < 3; i++) {
        const points = Math.floor(Math.random() * 10) + 1;
        totalPoints += points;

        historyData.push({
          userId: user._id,
          points: points,
          claimedAt: randomDate(),
        });
      }

      // Update user totalPoints
      await User.findByIdAndUpdate(user._id, { totalPoints });
    }

    //console.log(`History data  ${historyData}`);
    await History.insertMany(historyData);
    console.log(`✅ Inserted ${historyData.length} claim history records.`);

    mongoose.disconnect();
  } catch (err) {
    console.error("Seeding failed:", err);
    mongoose.disconnect();
  }
}
