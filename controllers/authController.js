const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");


const generateTokenAndSetCookie = (res, user) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, 
  });
};

// --- Register ---
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, profilePic } = req.body;

    // check if exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already used" });

    // create user
    const user = await User.create({ name, email, password, role, profilePic });

    // create Student or Teacher record if needed
    if (role === "student") await Student.create({ user: user._id });
    if (role === "teacher") await Teacher.create({ user: user._id });

    res.status(201).json({
      message: "User registered successfully",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error: error.message });
  }
};

// --- Login ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    generateTokenAndSetCookie(res, user);

    res.json({ id: user._id, name: user.name, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};

// --- Logout ---
exports.logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.json({ message: "Logged out successfully" });
};
