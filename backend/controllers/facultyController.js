const { default: mongoose } = require("mongoose");
const Faculty = require("../models/facultyModel");
const User = require("../models/userModel");
const cloudinary = require("../services/cloudinary"); 
const getFacultys = async (req, res) => {
  try {
    const Facultys = await Faculty.find({});
    res.status(200).json(Facultys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFaculty = async (req, res) => {
  try {
    const { id } = req.params;  
    const [aggregatedFaculty] = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id), accountType: 'faculty' } },
      {
        $lookup: {
          from: 'faculty',
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

    if (!aggregatedFaculty) return res.status(404).json({ message: 'Faculty not found' });
    res.status(200).json(aggregatedFaculty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFaculty = async (req, res) => {

  try{
    const FacultyData=req.body;
    if(req.file){
      FacultyData.imageUrl=req.file.path;
      FacultyData.cloudinaryId=req.file.filename;
    }    
    const Faculty =  await Faculty.create(FacultyData);
    res.status(201).json(Faculty);
  }catch(error){
    console.error("Error creating Faculty: ".error);
    res.status(500).json({message: error.message});
  }
}

const updateFacultyProfile=async(req, res)=>{
  try{
    const userId=req.user.id;
    const user=await User.findById(userId);
    if(!user) return res.status(404).json({message: 'User not found'});
    if(user.accountType!='faculty')
        return res.status(400).json({message: "You don't have permissions to edit this !!"});
    const profileData=req.body;
    if(req.file){
      profileData.imageUrl=req.file.path;
      profileData.cloudinaryId=req.file.filename;
    }
    const updatedProfile=await Faculty.findOneAndUpdate(
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

const updateFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if(req.file){
      updateData.imageUrl=req.file.path;
      updateData.cloudinaryId=req.file.filename;
    }
    const Faculty = await Faculty.findByIdAndUpdate(id, updateData, {new: true});
    if (!Faculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.status(200).json(Faculty);
  } catch (error) {
    console.error("Error updating Faculty: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteFaculty = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFaculty = await Faculty.findByIdAndDelete(id);

    if (!deletedFaculty) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    if(deletedFaculty.cloudinaryId){
      await cloudinary.uploader.destroy(Faculty.cloudinaryId);
    }

    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.error("Error deleting Faculty: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFacultys,
  getFaculty,
  createFaculty,
  updateFaculty,
  updateFacultyProfile,
  deleteFaculty,
};
