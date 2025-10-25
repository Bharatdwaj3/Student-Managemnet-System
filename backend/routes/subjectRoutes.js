const express=require('express');
const router=express.Router();

const{
    getSubject, createSubject, updateSubject, deleteSubject,
    getSubjects, 
} =require('../controllers/subjectController');

const authMiddleware = require('../middleware/authMiddleware');
const checkPermission = require('../middleware/checkPermission');
const roleMiddleware = require('../middleware/roleMiddleware');


router.get('/',
    authMiddleware,
    roleMiddleware(['admin','faculty','student']),
    checkPermission('view_subjects'),
    getSubjects);
router.post('/:userId',
    authMiddleware,
    roleMiddleware(['student','admin']),
    checkPermission('create_subject'),
    createSubject);
router.put('/:id',
    authMiddleware,
    roleMiddleware(['student','admin']),
    checkPermission('update_subject'),
    updateSubject);
router.delete('/:id',
    authMiddleware,
    roleMiddleware(['student','admin']),
    checkPermission('delete_subject'),
    deleteSubject);

module.exports=router;