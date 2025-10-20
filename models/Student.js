const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
  dob: {
    type: Date
  },
  class: {
    type: String
  }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
