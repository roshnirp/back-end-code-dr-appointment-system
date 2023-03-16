const express = require('express');
const { getAllUsersController, getAllDoctorController } = require('../controllers/adminCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

const router =express.Router()
//get method || users
router.get('/getAllUsers',  getAllUsersController)

//get method || doctor
router.get('/getAllDoctors',  getAllDoctorController)
module.exports = router;