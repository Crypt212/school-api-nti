const Course = require("../models/Course");

// 🆕 Create course (admin or teacher)
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price, duration } = req.body;
    const course = await Course.create({
      title,
      description,
      price,
      duration,
      teacher: req.user._id,
    });
    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Failed to create course", error: error.message });
  }
};

// 📜 Get all courses (public)
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("teacher", "name email");
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch courses", error: error.message });
  }
};

// 🔍 Get single course
exports.getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("teacher", "name email");
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch course", error: error.message });
  }
};

// ✏️ Update course (teacher owner or admin)
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // تحقق من المالك أو admin
    if (
      course.teacher.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "You are not allowed to update this course" });
    }

    Object.assign(course, req.body);
    await course.save();

    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Failed to update course", error: error.message });
  }
};

// ❌ Delete course (teacher owner or admin)
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      course.teacher.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "You are not allowed to delete this course" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete course", error: error.message });
  }
};
