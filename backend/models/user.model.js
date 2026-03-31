const mongoose= require("mongoose");
const bcrypt= require("bcryptjs");
const jwt= require("jsonwebtoken");
const userSchema= new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    email: { type: String, required: true, trim: true, unique: true},
    password: { type: String, required: true, minlength: 6}
});
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password= await bcrypt.hash(this.password, 10);
    next();
});
userSchema.methods.generateToken= function(){
    return jwt.sign({ userId: this._id},process.env.JWT_SECRET,{ expiresIn: "7d"});
};
const User= mongoose.model("User",userSchema);
module.exports= User;