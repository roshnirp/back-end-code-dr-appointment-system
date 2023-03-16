
const mongoose = require("mongoose");
const clinicSchema = new mongoose.Schema(
    {
     
        clinicName: {
            type:String,
            require:[true,'firstName is required']
        },
        clinic_password: {
            type:String,
            require:[true,'lastName is required']
        },
        mobileNo: {
            type:String,
            require:[true,'phone number is required']
        },
        email:{
                type:String,
                require:[true, 'email is required']
        },
        website: {
            type:String,
        },
        address: {
            type:String,
            required:[true, 'address is required']
        }
    }

)
const clinicModel = mongoose.model('clinic', clinicSchema)
module.exports = clinicModel