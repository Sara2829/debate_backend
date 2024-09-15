const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const Chat = require("./Models/chatSchema.js");
require("dotenv").config();

const AuthUser = require("./Routes/Authentication.js");
const getUsers = require("./Routes/getUser.js");
const debateTops = require("./Routes/debate.js");
const chatRoutes = require("./Routes/chats.js");
const notificationRoutes = require("./Routes/notification.js");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Auth end points
app.use("/api", AuthUser);
app.use("/api", getUsers);
app.use("/api", debateTops);
app.use("/api", chatRoutes);
app.use("/api", notificationRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Simple GET request
app.get("/", (req, res) => {
  res.send("Welcome to the debate app");
});

// Start server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Server failed to start:", err);
  } else {
    console.log(`Server started on port ${PORT}`);
  }
});
