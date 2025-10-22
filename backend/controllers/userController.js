const bycrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');

const signupUser=async(req, res)=>{
  try{
    const {fullName, email, accountType, password}=req.body;
    let user=await User.findOne({email});
    if(user){
      return res.status(400).json({message:'User with this email already exists!'});
    }
    user=new User({fullName, email, accountType, password});

    const salt=await bycrypt.genSalt(10);
    user.password=await bycrypt.hash(password, salt);

    await user.save();
    res.status(201).json({message:'User registered successfully'});

  }catch{
    console.error('Error registering user: ',error);
    res.status(500).json({message:'Server Error'});
  }
};

const loginUser=async(req, res)=>{
  try{
    const {email, password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({message:'Invalid credentials'});
    }
    const isMatch=await bycrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: 'Invalid credentials'});
    }
    const payload={user:{id:user.id}};
    jwt.sign(
      payload, process.env.JWT_SECRET,
      {expiresIn:'5h'},
      (err, token)=>{
        if(err) throw err;
        res.status(200).json({
          token,
          user:{
            id:user.id,
            fullname:user.fullName,
            email:user.email,
            accountType:user.accountType,
          }
        })
      }
    )
  }catch(error){
    console.error('Error logging in : ',error);
    res.status(500).join({message: 'Server Error'});
  }
};

module.exports={
  signupUser,
  loginUser,
};