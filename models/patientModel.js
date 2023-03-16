const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
    patientId:{
        type:String,
        require:true
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
    time:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    mobile_No:{
        type:String,
    },
    reasion:{
        type:String,
    },
    
    status:{
        type:String,
        required:true,
        default:"pending"

    },

},

{timestamps:true}
)

const patientModel = mongoose.model("patientdetail",patientSchema)
module.exports = patientModel;