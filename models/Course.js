const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
  title:{type:String},
  code: { 
    type: String, 
    unique: true 
  },
  description: {
    type: String
  },
  teacher: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Teacher'
  },
  maxStudents: { type:Number }
});

module.exports = mongoose.model('Course', courseSchema);