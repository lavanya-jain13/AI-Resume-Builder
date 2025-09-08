const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/resumes", require("./routes/resumeRoutes"));
app.use("/api/ai", require("./routes/aiRoutes")); // AI routes

// Root test
app.get("/", (req, res) => {
  res.send("Resume Builder Backend Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
