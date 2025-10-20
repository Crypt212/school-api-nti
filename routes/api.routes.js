const { body, matchedData } = require("express-validator");
const { Router } = require("express");
const { handleValidation } = require("../middlewares/error-handler.middleware.js");

const authRoutes = require("./authRoutes");

const APIRouter = Router();

// --- Routes ---
APIRouter.use("/auth", authRoutes);

APIRouter.get("/", (req, res) => res.send("School API is running!"));


APIRouter.get("/error", (req, res) => {
    throw new Error("Test Error");
});

APIRouter.get("/validation", 
    body("email").notEmpty().isEmail(), 
    handleValidation,
    (req, res) => {
        res.json(matchedData(req));
});

module.exports = APIRouter;
