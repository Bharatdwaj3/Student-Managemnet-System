const mongoose=require('mongoose');
const subjectSchema=new mongoose.Schema({
    userId:{type:String, type: mongoose.Schema.Types.ObjectId, required: true, index: true},
    name: {type:String, required: true, trim: true},
    code: {type:String, required: true, trim: true},
    dept: {type:String, required: true, trim: true},
    
},{
    timestamps: true
});


module.exports=subjectSchema;

