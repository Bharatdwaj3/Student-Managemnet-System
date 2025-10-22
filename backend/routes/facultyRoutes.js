const express=require('express');
const router=express.Router();
const upload=require('../services/multer');
const{
    getFaculty, createFaculty, updateFaculty,deleteFaculty, 
    getFacultys,
    
} =require('../controllers/FacultyController');

router.get('/',getFacultys);
router.get('/:id',getFaculty);
router.post('/:id',upload.single('image'),createFaculty);
router.put('/:id',upload.single('image'),updateFaculty);
router.delete('/:id',deleteFaculty);

module.exports=router;