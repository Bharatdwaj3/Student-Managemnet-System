const express=require('express');
const router=express.Router();
const upload=require('../services/multer');
const{
    getFaculty, deleteFaculty, 
    getFacultys,updateFacultyProfile
    
} =require('../controllers/facultyController');

const checkPermission = require('../middleware/checkPermission');
const roleMiddleware = require('../middleware/roleMiddleware');
const authUser=require('../middleware/authMiddleware');

router.get('/',
    roleMiddleware(['admin','faculty','student']),
    checkPermission('view_facultys'),
    getFacultys);
router.get('/:id',
    authUser, 
    roleMiddleware(['faculty']), 
    checkPermission('view-self'),
    getFaculty);
router.put('/profile/:id',
    upload.single('image'), 
    authUser, 
    roleMiddleware(['faculty']), 
    checkPermission('update-self'), 
    updateFacultyProfile);
router.delete('/:id',
    roleMiddleware(['admin']), 
    checkPermission('delete_student'), 
    deleteFaculty);

module.exports=router;