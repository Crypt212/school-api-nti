const mongoose=require('mongoose');
const TeacherSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
   subject:{
       type:String
   },
    phone:{
        type:String
    }
})

module.exports=mongoose.model('Teacher',TeacherSchema);