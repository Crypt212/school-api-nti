const mongoose = require('mongoose');
const GradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  assignmentName: { type: String },
  score: { type: Number },
  maxScore: { type: Number },
  givenBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }
});

module.exports = mongoose.model('Grade', GradeSchema);