const express = require('express')
const mongoose = require('mongoose');
const studentSchema = require('../schemas/studentSchema');

const studentModel = mongoose.model('studentModel', studentSchema,'student');
module.exports=studentModel;