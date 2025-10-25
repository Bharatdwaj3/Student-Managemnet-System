const Subject = require("../models/subjectModel");
 
const getSubjects = async (req, res) => {
  try {
    const Subjects = await Subject.find({});
    res.status(200).json(Subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const Subjects = await Subject.findById(id);
    res.status(200).json(Subjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSubject = async (req, res) => {

  try{

    const {userId}=req.params;
    const {name, code, dept}=req.body;
    if(req.user.id.toString()!==userId){
      return res.status(403).json({message: "You can only create subjects for yourself!"})
    }

    const subjectData = await Subject.create({
      userId,
      name,
      code, dept
    });
    res.status(201).json(subjectData);
  }catch(error){
    console.error("Error creating Subject: ".error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "You already have a subject with this code" });
    }
    res.status(500).json({message: error.message});
  }
}
const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const subjectData = await Subject.findByIdAndUpdate(id, updateData, {new: true});
    if (!subjectData) {
      return res.status(404).json({ message: "Subject not found" });
    }
    if(subjectData.userId.toString()!=req.user.id.toString()&& req.user.role!=='admin'){
      return res.status(403).json({message: "You can only update your own subjects "})
    }
    const updatedSubject=await Subject.findByIdAndUpdate(
      id, updateData, {new : true, runValidators: true}
    );

    res.status(200).json(Subject);
  } catch (error) {
    console.error("Error updating Subject: ",error);
    res.status(500).json({ message: error.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subjectData = await Subject.findByIdAndDelete(id);

    if (!subjectData.userId.toString()!==req.userr.id.toString()&& req.user.role!=='admin') {
      return res.status(404).json({ message: "Subject not found" });
    }
    await Subject.findByIdAndDelete(id);
    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    console.error("Error deleting Subject: ",error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};
