const express=require('express');
const upload=require('../services/multer');
const router=express.Router();
const{
    getStudent, createStudent, updateStudent, deleteStudent,
    getStudents, updateStudentProfile

} =require('../controllers/studentComtroller');

const checkPermission = require('../middleware/checkPermission');
const roleMiddleware = require('../middleware/roleMiddleware');
const authUser=require('../middleware/authMiddleware');

router.get('/',
    roleMiddleware(['admin','faculty','student']),
    checkPermission('view_students'),
    getStudents);
router.get('/:id',
    authUser, 
    roleMiddleware(['student']), 
    checkPermission('view_students'),
    getStudent);
router.put('/profile/:id',
    upload.single('image'), 
    authUser, 
    roleMiddleware(['student']), 
    checkPermission('update-self'), 
    updateStudentProfile);
router.delete('/:id',
    roleMiddleware(['admin']), 
    checkPermission('delete_student'), 
    deleteStudent,);

module.exports=router;