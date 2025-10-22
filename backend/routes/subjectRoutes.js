const express=require('express');
const router=express.Router();
const upload=require('../services/multer');
const{
    getSubject, createSubject, updateSubject, deleteSubject,
    getSubjects, 
} =require('../controllers/subjectController');

router.get('/',getSubjects);
router.get('/:id',getSubject);
router.post('/:id',createSubject);
router.put('/:id',updateSubject);
router.delete('/:id',deleteSubject);

module.exports=router;