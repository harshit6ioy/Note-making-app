const jwt= require("jsonwebtoken");
const authMiddleware= (req,res,next)=>{
    const authHeader= req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({"message": "No Token Provided"});
    }
    const token= authHeader.split(" ")[1];
    try{
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        req.userId=decoded.userId;
        next();
    }catch(err){
        res.status(401).json({ message: "Invalid or expired token"});
    }
};
module.exports= authMiddleware;