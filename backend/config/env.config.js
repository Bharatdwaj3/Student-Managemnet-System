require('dotenv').config();


const PORT = process.env.PORT || 5000;
const SESSION_SECRECT = process.env.SESSION_SECRECT || 'defaultSessionsecret';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/noblese';
const JWT_SECRECT = process.env.JWT_SECRECT || 'defaultjwtsecret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

module.exports = {  PORT, MONGO_URI, SESSION_SECRECT, JWT_SECRECT, JWT_EXPIRES_IN };