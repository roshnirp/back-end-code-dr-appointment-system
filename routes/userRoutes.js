const express = require("express");
const userModel = require("../models/userModels");
const clinicModel = require("../models/clinicModel");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const patientModel = require("../models/patientModel");
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
  listclinicController,
  docterListController,
  bookeAppointmentlistController,
  editcliniclistController,
  editdoctorlistController,
  editpatientlisrtControlle
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

//list the docter details
router.get('/apply-doctor', docterListController );
//admin post api

router.post('/admin', adminController );

//clinic post api

router.post('/clinic', clinicController);
router.get('/clinic', listclinicController);
router.get('/clinic/:_id', editcliniclistController);
router.get('/book-appointment',bookeAppointmentlistController);
router.get('/apply-doctor/:_id', editdoctorlistController);
router.get('/book-appointment/:_id', editpatientlisrtControlle);

// put method for editecliniclistcontroller

router.put("/clinic/:_id", async(req,res)=>{
  let user = await clinicModel.findById(req.params._id);
   user = await clinicModel.findByIdAndUpdate(req.params._id,req.body,{new:true,
  useFindAndModify:false,
   runValidators:true 
  })
  res.status(200).json({
      success:true,
      user
  })
})


// put method for editedoctorlistcontroller

router.put("/apply-doctor/:_id", async(req,res)=>{
  let user = await doctorModel.findById(req.params._id);
   user = await doctorModel.findByIdAndUpdate(req.params._id,req.body,{new:true,
  useFindAndModify:false,
   runValidators:true 
  })
  res.status(200).json({
      success:true,
      user
  })
})

router.put("/book-appointment/:_id", async(req,res)=>{
  let user = await patientModel.findById(req.params._id);
   user = await patientModel.findByIdAndUpdate(req.params._id,req.body,{new:true,
  useFindAndModify:false,
   runValidators:true 
  })
  res.status(200).json({
      success:true,
      user
  })
})



// Delete product
router.delete("/clinic/:_id/",async(req,res)=>{
  const listingdata = await clinicModel.findById(req.params._id);
 
  if(!listingdata)
  {
    return res.status(500).json({
      success:false,
      message:"data not found"
    })
  }
  await listingdata.remove();
  
  res.status(200).json({
    success: true,
    message:"data is deleted successfully"
  })
})

// Delete product
router.delete("/apply-doctor/:_id",async(req,res)=>{
  const listingdata = await doctorModel.findById(req.params._id);
 
  if(!listingdata)
  {
    return res.status(500).json({
      success:false,
      message:"data not found"
    })
  }
  await listingdata.remove();
  
  res.status(200).json({
    success: true,
    message:"data is deleted successfully"
  })
})
//delet appointment

router.delete("/admin/appointment/:_id",async(req,res)=>{
  const listingdata = await appointmentModel.findById(req.params._id);
 
  if(!listingdata)
  {
    return res.status(500).json({
      success:false,
      message:"data not found"
    })
  }
  await listingdata.remove();
  
  res.status(200).json({
    success: true,
    message:" deleted appointment successfully"
  })
})
//delete patient list

router.delete("/book-appointment/:_id",async(req,res)=>{
  const listingdata = await patientModel.findById(req.params._id);
 
  if(!listingdata)
  {
    return res.status(500).json({
      success:false,
      message:"data not found"
    })
  }
  await listingdata.remove();
  
  res.status(200).json({
    success: true,
    message:" deleted patientlist  successfully"
  })
})






module.exports = router;