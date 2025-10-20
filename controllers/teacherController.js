const User = require('../models/User');

// 🟢 إنشاء مدرس جديد
exports.createTeacher = async (req, res) => {
  try {
    const { name, email, passwordHash, profilePic } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Teacher already exists' });

    const teacher = await User.create({
      name,
      email,
      passwordHash,
      role: 'teacher',
      profilePic
    });

    res.status(201).json({ message: 'Teacher created successfully', teacher });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// 🟡 عرض كل المدرسين
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }).select('-passwordHash');
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🟠 عرض مدرس محدد
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id).select('-passwordHash');
    if (!teacher || teacher.role !== 'teacher')
      return res.status(404).json({ message: 'Teacher not found' });

    res.json(teacher);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔵 تعديل بيانات مدرس
exports.updateTeacher = async (req, res) => {
  try {
    const { name, email, profilePic } = req.body;
    const teacher = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, profilePic },
      { new: true }
    ).select('-passwordHash');

    if (!teacher || teacher.role !== 'teacher')
      return res.status(404).json({ message: 'Teacher not found' });

    res.json({ message: 'Teacher updated successfully', teacher });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// 🔴 حذف مدرس
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await User.findById(req.params.id);
    if (!teacher || teacher.role !== 'teacher')
      return res.status(404).json({ message: 'Teacher not found' });

    await teacher.deleteOne();
    res.json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
