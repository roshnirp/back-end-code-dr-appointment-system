const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
    {
    
        doctorName: {
            type:String,
            require:[true,'firstName is required']
        },
    
        phoneNo: {
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
        },
        specialization: {
            type:String,
            required:[true,'specialization is required']
        },
        experience:{
            type:String,
            required:[true, 'experience is required']
        },
        feesPerCunsaltation:{
            type:Number,
            required:[true, 'fee is required']
        },
      
        
        status: {
            type:String,
            default:'pending'
        },
        
    },
    {
        timestamps:true
    }

)
const doctorModel = mongoose.model('doctors', doctorSchema)
module.exports = doctorModel