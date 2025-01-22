
import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utlis/generateToken.js";


export async function signup(req,res) {
    try {
     const { email, password, username} = req.body;
 
 if(!email || !password || !username){
     return res.status(400).json({message:"Please fill in all fields"});
 } 
 const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
 if(!emailRegex.test(email))
    { 
  return res.status(400).json({success:false,message:"invalid email"});
 }
 if (password.length < 6){
     return res.status(400).json({success:false,message:"Password must be at least 6 characters"
     });
    }
    const existingUserByEmail = await User.findOne({email:email});

    if(existingUserByEmail){
     return res.status(400).json({success:false,message:"Email already in use"});
      }
      const existingUserByUsername = await User.findOne({username:username});

      if(existingUserByUsername){
         return res.status(400).json({success:false,message:"Username already in use"});
      }
 
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      // 123pass => **$%#%
 
      const PROFILE_PICS = ["/avatar1.jpg","/avatar2.jpg", "/avatar3.jpg"];

      const image = PROFILE_PICS[
         Math.floor(Math.random() * PROFILE_PICS.length)];
         
       const newUser = new User({
        email:email,
      password:hashedPassword,
      username:username,
         image:image,
       });
 
       if (newUser){
         generateTokenAndSetCookie(newUser._id,res);
         await newUser.save();
 
         // remove password from the response
         res.status(201).json({success:true, 
            user:{
           ...newUser._doc,
           password:"",
         },
       });
       } 
 
     } catch (error) {
       console.log("Error in signup controller",error.message)  
      res.status(500).json({success:false, message: "Failed to create user"});
   }
 }

 export async function login (req,res){
    try {
      const {email,password} = req.body;
    
      if(!email || !password) {
        return res.status(400).json({success:false,message:"Email and password are required"});
      }
      const user = await User.findOne({email:email});
      if(!user){
        return res.status(400).json({success:false,message:"Invalid email or password"});
      }
      const isPasswordCorrect = await bcryptjs.compare(password,user.password);
      if(!isPasswordCorrect){
        return res.status(400).json({success:false,message:"Invalid email or password"});
      }
      generateTokenAndSetCookie(user._id,res); 

    res.status (200).json({success:true,user:
        {...user._doc,
      password:"",
        },
    });
    }catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function logout(req, res) {
	try {
		res.clearCookie("jwt-watchit");
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}
    
  
export async function authCheck(req, res) {
  try{
    console.log("req.user:",req.user);
    res.status(200).json({success:true, user: req.user});
    } catch (error){
console.log("Error in authCheck controller", error.message);
 res.status(500).json({ success: false, message:"Internal server error" });

  }
}



