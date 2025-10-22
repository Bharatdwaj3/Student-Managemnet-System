const express=require('express');
const upload=require('../services/multer');
const router=express.Router();
const{
    getStudent, createStudent, updateStudent, deleteStudent,
    getStudents, 

} =require('../controllers/studentComtroller');

router.get('/',getStudents);
router.get('/:id',getStudent);
router.post('/:id',upload.single('image'),createStudent);
router.put('/:id',upload.single('image'),updateStudent);
router.delete('/:id',deleteStudent);

module.exports=router;