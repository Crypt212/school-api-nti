const Student = require('../models/Student');
const User = require('../models/User');

// 🟢 إنشاء طالب جديد (Admin فقط)
exports.createStudent = async (req, res) => {
  try {
    const { userId, dob, class: className } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'student') {
      return res.status(400).json({ message: 'User must have role student' });
    }

    const student = await Student.create({ user: userId, dob, class: className });

    res.status(201).json({ message: 'Student created successfully', student });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 🟡 عرض كل الطلاب (Admin + Teacher)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().populate('user', 'name email role');
    res.json({ count: students.length, students });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 🟠 عرض طالب واحد (Admin + Teacher)
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate('user', 'name email');
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 🔵 تحديث بيانات الطالب (Admin فقط)
exports.updateStudent = async (req, res) => {
  try {
    const { dob, class: className } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { dob, class: className },
      { new: true }
    );

    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student updated successfully', student });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 🔴 حذف طالب (Admin فقط)
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
