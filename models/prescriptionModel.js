const mongoose = require("mongoose");
const prescriptionSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    doctorInfo:{
        type:String,
        required:true
    },
    userInfo:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    disease:{
        type:String,
        required:true

    },
    dosage:{
        type:String,
        required:true

    },
    frequency:{
        type:String,
        required:true

    },
    age:{
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
const prescriptionModel = mongoose.model("userprescription",prescriptionSchema)
module.exports = prescriptionModel;