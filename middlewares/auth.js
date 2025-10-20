const jwt=require ('jsonwebtoken');
const User =require('../models/User');

exports.authMiddleware=async(req,res,next)=>{

try{

    const token=req.header('Authorization')?.replace('Bearer ','');

    if(!token){
        return res.status(401).json({message:'No token, authorization denied'});
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const user=await User.findById(decoded.id).select('-passwordHash');

   if(!user){
       return res.status(404).json({message:'User not found'});
   }

   req.user=user;
   next();
}
catch(err){
   console.error(err);
   res.status(500).json({message:'Server error'});
}

}

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};