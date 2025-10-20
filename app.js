
const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

const authRoutes = require("./routes/authRoutes");

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- Routes ---
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => res.send("School API is running!"));


module.exports = app;
