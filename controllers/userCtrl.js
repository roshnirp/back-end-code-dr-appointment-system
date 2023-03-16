const userModel = require("../models/userModels");
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const prescriptionModel = require("../models/prescriptionModel");
const patientModel = require("../models/patientModel");
const adminModel = require("../models/adminModel");
const clinicModel = require("../models/clinicModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register callback
const registerController = async (req, res) => {
  try {
    const exisitingUser = await userModel.findOne({ email: req.body.email });
    if (exisitingUser) {
      return res
        .status(200)
        .send({ message: "User Already Exist", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Register Sucessfully", success: true });
  } catch (error) {
    console.log(error);
    res
    .status(500)
    .send({
      success: false,
      message: `Register Controller ${error.message}`,
    });
  }
};

// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .send({ message: "user not found", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .send({ message: "Invlid EMail or Password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token:token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};
 const authController = async (req, res) => {
  
  try {

    // const user = await userModel.findOne({_id:req.body.userId})
    const user = await userModel.findById({_id:req.body.userId})
    user.password = undefined;
    if(!user){
      return res.status(200).send({
        message:'user not found',
        success: false
      })
    }
    else{
      res.status(200).send({
        success:true,
        data:user
        // {
        //   name:user.name,
        //   email:user.email,
        // }
        // ,
      });

    }
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:'auth error',
      success: false,
      error
    })
  }
 };

 //Apply Doctor CTRl
 const applyDoctorController = async(req,res) =>{
  try {

    const newDoctor= await doctorModel({
      ...req.body, status:'pending'
    })
    await newDoctor.save()
    const adminUser = await userModel.findOne({isAdmin:true})
    const notification = adminUser.notification;
    notification.push({
       type:'appy-doctor-request',
       message:`${newDoctor.firstName} ${newDoctor.lastName} has Applied for a doctor Account`,
       data:{
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: '/admin/doctors',
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, {notification});
    res.status(201).send({
      success:true,
      message:'Doctor Account Applied Succssful'
    });
  }
   catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while Applying for Doctor'
    })
    
  }

 };

//Book Appointment
 const bookeAppointmentController = async(req,res) => {
  try {
    req.body.status = 'pending'
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    // const user = await userModel.findOne({_id:req.body.doctorInfo.userId });
    //   const notification = user.notification;
    //   notification.push({
    //   type:'New-appointment-request',
    //   message:`A new Appointment Reques from ${req.body,userInfo.name}`,
    //   onClickPath:'/user/appointments',
    // });
    // await user.save();
    res.status(200).send({
      success: true,
      message: 'Appointment Book Successully',
    });

  } catch (error) {

    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while Booking Appointment'
    })
    
  }

 };

 const userAppointmentController = async(req, res)=> {
  try {
    const appointments = await appointmentModel.find();
    res.status(200).send({
      success:true,
      message:"User Appointments Fetch Successfully",
      data:appointments,
      
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error In User Appointments'
    })
  }
 }

 const userPrescriptionController = async(req,res)=>{
  try {
     req.body.status = 'pending'
     const newPriscription = new prescriptionModel(req.body);
     await newPriscription.save();

    //  const addpriscition = await userModel.find()
    //  const notification = addpriscition.notification;
    //  notification.push({
    //   type:'add-user-priscription request',
    //   data:{
    //     notification
    //   }

    //  })

     res.status(200).send({
      success: true,
      message:'add userPriscription successful',
     });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while adding Priscription'
    })
  }

 };

 const usergetPrescriptionController = async(req, res)=>{
  try {
    const prescriptions = await prescriptionModel.find();
    res.status(200).send({
      success:true,
      message:'user presiption Fetch Successful',
      data:prescriptions,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error In User prescription'
    })
    
  }
 }

 const addPatientController = async(req, res) => {
  const {patientId} = req.body;
  try {
    req.body.status = 'pending'

   
    const patientExists = await patientModel.findOne({patientId});
    if(patientExists)
    {
     return res.status(400).send({
        success:false,
        message:'patient Already Exits'
      })
      // throw new Error("patient Alread Exists");
    }
    const newPatient = new patientModel(req.body);
    await newPatient.save();

    
    const addpatientintoappointment = new appointmentModel(req.body);
    await addpatientintoappointment.save();




    res.status(200).send({
      success:true,
      message:'add patient successully',
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while Add patient'
    })
  }
 };


 const adminController = async(req, res) => {


 
  // const {email} = req.body;
  try {
    req.body.status = 'pending'

   
  //   const adminExists = await adminModel.findOne({email});
  //   if(adminExists)
  //   {
  //    return res.status(400).send({
  //       success:false,
  //       message:'admin Already Exits'
  //     })
  // //     // throw new Error("patient Alread Exists");
  //   }
    const newadmin = new adminModel(req.body);
    await newadmin.save();

        res.status(200).send({
      success:true,
      message:'add admin successully',
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while Add admin'
    })
  }
 };

 const clinicController = async(req, res) => {

  try {
    req.body.status = 'pending'
    const newclinic = new clinicModel(req.body);
    await newclinic.save();

        res.status(200).send({
      success:true,
      message:'add clinic successully',
    });
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      error,
      message:'Error while Add admin'
    })
  }
  }

  const listclinicController = async(req, res)=>{

    try {
      const cliniclistdata = await clinicModel.find();
      res.status(200).send({
        success:true,
        message:'Cliniclistdata Fetch Successful',
        data:cliniclistdata,
        status:"ok", data:cliniclistdata
      })
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success:false,
        error,
        message:'Error In User cliniclistdata'
      })
      
    }

  }


 



module.exports = { loginController, 
                registerController, 
                 authController, 
                 adminController,
                 clinicController,
                applyDoctorController,
                bookeAppointmentController,
                userAppointmentController,
                userPrescriptionController,
                addPatientController,
                usergetPrescriptionController,
                listclinicController
              };
