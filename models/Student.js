const mongoose=require('mongoose');

const studentSchema=new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
     required: true
  },
  dob: {
    type: Date,
    required: true
  },
  class: {
    type: String,
    required: true

  }
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
