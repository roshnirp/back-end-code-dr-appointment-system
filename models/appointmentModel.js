const mongoose = require("mongoose")
const appointmentSchema = new mongoose.Schema({
    userId:{
        type:String,
        // required:true
    },
    doctorId:{
        type:String,
        // required:true
    },
    doctorInfo:{
        type:String,
        // required:true
    },
    userInfo:{
        type:String,
        // required:true
    },
    patientId:{
        type:String,
        require:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    data:{
        type:String,
    },
    date:
    {
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default:"pending"
    },
},
 {timestamps:true}
)
const appointmentModel   = mongoose.model("appointment",appointmentSchema)
module.exports = appointmentModel;