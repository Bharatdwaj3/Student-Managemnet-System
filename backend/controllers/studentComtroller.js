const { default: mongoose } = require("mongoose");
const Student = require("../models/studentModel");
const User = require("../models/userModel");
const cloudinary = require("../services/cloudinary"); 
const getStudents = async (req, res) => {
  try {
    const Students = await Student.find({});
    res.status(200).json(Students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudent = async (req, res) => {
  try {
    const { id } = req.params;  
    const [aggregatedStudent] = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id), accountType: 'student' } },
      {
        $lookup: {
          from: 'student',
          localField: '_id',
          foreignField: 'userId',
          as: 'profile'
        }
      },
      { $unwind: { path: '$profile', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          accountType: 1,
          age: '$profile.age',
          gender: '$profile.gender',
          dept: '$profile.dept',
          major: '$profile.major',
          course: '$profile.course',
          imageUrl: '$profile.imageUrl'
        }
      }
    ]);

    if (!aggregatedStudent) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json(aggregatedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const createStudent = async (req, res) => {

  try{
    const StudentData=req.body;
    if(req.file){
      StudentData.imageUrl=req.file.path;
      StudentData.cloudinaryId=req.file.filename;
    }    
    const Student =  await Student.create(StudentData);
    res.status(201).json(Student);
  }catch(error){
    console.error("Error creating Student: ".error);
    res.status(500).json({message: error.message});
  }
}
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }
    const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {new: true});
    
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(Student);
  } catch (error) {
    console.error("Error updating Student: ",error);
    res.status(500).json({ message: error.message });
  }
};

const updateStudentProfile=async(req, res)=>{
  try{
    const userId=req.user.id;
    const user=await User.findById(userId);
    if(!user) return res.status(404).json({message: 'User not found'});
    if(user.accountType!='student')
        return res.status(400).json({message: "You don't have permissions to edit this !!"});
    const profileData=req.body;
    if(req.file){
      profileData.imageUrl=req.file.path;
      profileData.cloudinaryId=req.file.filename;
    }
    const updatedProfile=await Student.findOneAndUpdate(
      {userId: userId},
      {...profileData, userId: userId},
      {new: true, upsert: true, setDefaultsOnInsert: true}
    );
    res.status(200).json(updatedProfile);
  }catch(error){
    console.error("Profile update error: ",error);
    res.status(500).json({message: error.message});
  }
}

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    if(deletedStudent.cloudinaryId){
      await cloudinary.uploader.destroy(Student.cloudinaryId);
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting Student: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  updateStudentProfile
};
