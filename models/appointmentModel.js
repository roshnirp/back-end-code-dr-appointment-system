const mongoose = require("mongoose")
const appointmentSchema = new mongoose.Schema({
  
    patientId:{
        type:String
    },
    patientName:{
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
 
    date:
    {
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    mobile_No:{
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