const internModel = require("../Models/internModel")
const collegeModel = require("../Models/collegeModel")
const emailValidator = require("email-validator")


const createIntern = async function(req, res){
    try{
        let {name, email, mobile, collegeId} = req.body

        if(!name){
            return res.status(404).send({status:false, Message:"Name not found!"})
        }

        if(!email){
            return res.status(404).send({status:false, message:"email not found!"})
        }

        let isEmailValid =await emailValidator.validate(email)

        if(!isEmailValid){
            return res.status(400).send({status:false, Message:"Email is Invalid!"})
        }

        
     
        if(!collegeId){
            return res.status(404).send({status:false, Message:"collegeId not found!"})
        
        }

        let isCollegeIdValid = await collegeModel.findById(collegeId)


        if(!isCollegeIdValid){
            return res.status(404).send({stsus:false,message:"College Id is In valid!"})
        }

        if(!mobile){
            return res.status(400).send({status: false, message: "mobile must be provided"})
        }
    
        if(! /^[6-9]\d{9}$/.test(mobile)){
            return res.status(400).send({status: false, message: "Mobile no. is not valid"})
        }

        const isMobileNotUnique = await internModel.findOne({mobile : mobile})

        if(isMobileNotUnique){
            return res.status(400).send({status: false, message: "mobile number already exist"})
        }
      
        const isEmailNotUnique = await internModel.findOne({email : email})

        if(isEmailNotUnique){
            return res.status(400).send({status: false, message: "email already exist"})
        }

        
        const college =await internModel.create(req.body)

        if(!college){
            return res.status(400).send({status:false,mesage:"No college is Created!"})
        }

        return res.status(200).send({status:true, document:college})

    }catch(err){
        res.status(500).send({msg:err.message})
    }
}



module.exports.createIntern = createIntern