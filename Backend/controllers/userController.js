import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    try{
      const user = await userModel.findOne({email});

      if(!user){
      return  res.send({success:false,message:"user doesn't exist"})
      }

      const isMatch = await bcrypt.compare(password,user.password)
   
      if(!isMatch){
      return res.send({success:false,message:"Invalid credentials"})
      }

       const token = createToken(user.id) 
       res.send({success:true,token})
      }catch(error){
        console.log(error)
         res.send({success:false,message:"Error"})
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async(req,res)=>{
  const {name,email,password} = req.body;
  try {
     const exist = await userModel.findOne({email})

     if(exist){
      return res.send({success:false,message:"email already exist!"})
     }

     if(!validator.isEmail(email)){
        return res.send({success:false,message:"enter valid email!"})
     }

     if(password.length<8){
        return res.send({success:false,message:"create strong Password!"})
     }     
            
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt)

     const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword
     })

     const user = await newUser.save();
     const token = createToken(user._id);
     res.send({success:true,token}) 
  } catch (error) {
    console.log(error);
    res.send({success:false,message:"Error"})
  }
}


//route for admin login
const adminLogin = async (req,res)=>{
    try{

        const {email,password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
           const token = jwt.sign(email+password, process.env.JWT_SECRET);
           res.json({success:true,token});
        }
        else{
            res.json({success:false,message:"Invalid Credentials"});
        }
    }
    catch(error){
       console.log(error);
       res.json({success:false, message:error.message});
    }
}

export {
  loginUser,
  registerUser,
  adminLogin
}