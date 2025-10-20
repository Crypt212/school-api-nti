const express = require('express');
const router = express.Router();

// 🧠 Controller الخاص بالـ Teachers
const teacherController = require('../controllers/teacherController');

// 🧩 Middleware للمصادقة والصلاحيات
const { authMiddleware } = require('../middlewares/auth');
const { authorizeRoles } = require('../middlewares/auth');

/*
|--------------------------------------------------------------------------
| 👨‍🏫 Teacher Routes
|--------------------------------------------------------------------------
| Endpoints:
| POST    /api/teachers        -> إنشاء مدرس جديد (Admin)
| GET     /api/teachers        -> عرض كل المدرسين (Admin)
| GET     /api/teachers/:id    -> عرض مدرس محدد (Admin)
| PUT     /api/teachers/:id    -> تعديل بيانات مدرس (Admin)
| DELETE  /api/teachers/:id    -> حذف مدرس (Admin)
|--------------------------------------------------------------------------
*/

// 🟢 إنشاء مدرس جديد
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  teacherController.createTeacher
);

// 🟡 عرض كل المدرسين
router.get(
  '/',
  authMiddleware,
  roleMiddleware(['admin']),
  teacherController.getAllTeachers
);

// 🟠 عرض مدرس محدد
router.get(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  teacherController.getTeacherById
);

// 🔵 تعديل بيانات مدرس
router.put(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  teacherController.updateTeacher
);

// 🔴 حذف مدرس
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware(['admin']),
  teacherController.deleteTeacher
);

module.exports = router;
