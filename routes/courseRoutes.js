const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courseController");

const { authMiddleware, authorizeRoles } = require("../middlewares/auth");

// Public
router.get("/", getCourses);
router.get("/:id", getCourse);

// Protected (admin/teacher)
router.post("/", authMiddleware, authorizeRoles ("teacher", "admin"), createCourse);
router.put("/:id", authMiddleware, authorizeRoles ("teacher", "admin"), updateCourse);
router.delete("/:id", authMiddleware , authorizeRoles ("teacher", "admin"), deleteCourse);

module.exports = router;
