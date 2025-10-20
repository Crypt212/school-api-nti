
const express = require("express");
const cookieParser = require("cookie-parser");
const APIRouter = require("./routes/api.routes.js");
const { handleError } = require("./middlewares/error-handler.middleware.js");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", APIRouter);

app.use(handleError);

module.exports = app;
