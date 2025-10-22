const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'User Name is required'],
        trim:true,
        minLength:2,
        maxLength:50,
    },
    email:{
        type:String,
        required:[true, 'User email is required'],
        unique:true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
    }, 
    password:{
        type:String,
        required:[true, 'User Password is required'],
        minLength:6,
    },
    password:{
        type:String,
        required:[true, 'User Password is required'],
        minLength:6,
    }
},{
    timestamps:true
});

module.exports=userSchema;