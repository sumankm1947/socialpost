const path = require('path');

require("dotenv").config();
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/.env" });
}

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Using Middlewares
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
app.use(cors());

// Importing Routes
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");

// Using Routes
app.use("/api/post", postRoutes);
app.use("/api/user", userRoutes);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// Error handling middleware
const { hasError } = require("./middlewares/error");
app.use(hasError);

module.exports = app;
