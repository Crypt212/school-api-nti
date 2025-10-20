const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, default: 0 },
    duration: { type: String, default: "N/A" },
    thumbnail: { type: String }, // optional image file
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
