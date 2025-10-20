const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controllers/authController");
const { body } = require("express-validator");
const { handleValidation } = require("../middlewares/error-handler.middleware");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
