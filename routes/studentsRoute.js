const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authMiddleware } = require('../middlewares/auth');
const { authorizeRoles } = require('../middlewares/auth');

// ✅ POST /students - إنشاء طالب (Admin فقط)
router.post('/', authMiddleware, authorizeRoles(['admin']), studentController.createStudent);

// ✅ GET /students - عرض كل الطلاب (Admin + Teacher)
router.get('/', authMiddleware, authorizeRoles(['admin', 'teacher']), studentController.getAllStudents);

// ✅ GET /students/:id - عرض طالب محدد (Admin + Teacher)
router.get('/:id', authMiddleware, authorizeRoles(['admin', 'teacher']), studentController.getStudentById);

// ✅ PUT /students/:id - تحديث بيانات الطالب (Admin فقط)
router.put('/:id', authMiddleware, authorizeRoles(['admin']), studentController.updateStudent);

// ✅ DELETE /students/:id - حذف طالب (Admin فقط)
router.delete('/:id', authMiddleware, authorizeRoles(['admin']), studentController.deleteStudent);

module.exports = router;
