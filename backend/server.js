require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const userRoutes = require("./routes/user");
const claimRoutes = require("./routes/claim");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// connect to database
connectDB();

//All API routes will start with /api
app.use("/api/users", userRoutes);
app.use("/api/claim", claimRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
