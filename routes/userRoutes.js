const express = require("express");
const userModel = require("../models/userModels");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  bookeAppointmentController,
  userAppointmentController,
  userPrescriptionController,
  usergetPrescriptionController,
  addPatientController,
  adminController,
  clinicController,
  listclinicController
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

//router onject
const router = express.Router();

//routes
//LOGIN || POST
router.post("/login",loginController);

router.get("/login", async(req,res)=>{
  const users = await userModel.find();
  res.status(200).json({
      success:true,
  users
})
});

//update user

router.put("/login/:id", (async (req, res) => {
  let user = await userModel.findById(req.params.id);

   user= await userModel.findByIdAndUpdate(req.params.id,req.body,
    {new:true,
    useFindAndModify:false,
     runValidators:true 
    })


  res.status(200).json({
    success: true,
    user,
  });
}))




//REGISTER || POST
router.post("/register", registerController);


//Auth || post
router.post('/getUserData' , authMiddleware , authController);


//Apply Doctor || POST 
router.post('/apply-doctor', applyDoctorController);

//add patient
router.post('/book-appointment', addPatientController)


//Book Appointment
router.post('/book-appointment',  bookeAppointmentController);

//Appointment List
router.get('/user-appointments', userAppointmentController)

//add prescrption
router.post('/add-prescription',  userPrescriptionController);

//prescrption list
router.get('/user-prescription', usergetPrescriptionController );

//admin post api

router.post('/admin', adminController );

//clinic post api

router.post('/clinic', clinicController);
router.get('/clinic', listclinicController);





module.exports = router;