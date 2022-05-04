const mongoose = require("mongoose")
const emailValidation = function(email){
    let regexForEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return regexForEmail.test(email)
}

const mobileValidation = function(mobile){
    let regexForMobile = /^[6-9]\d{9}$/
    return regexForMobile.test(mobile)
}


const internSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [emailValidation, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mobile: {
        type : Number,
        required : [true, "mobile number is mandatory"],
        unique: [true, "mobile number already exist"],
        validate:[mobileValidation, "please enter a valid mobile number"],
        trim :true
    },
    collegeId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"College",
        
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
    
})

module.exports = mongoose.model("Intern", internSchema)