const internModel = require("../Models/internModel")
const collegeModel = require("../Models/collegeModel")
const emailValidator = require("email-validator")

const isValid = function (value) {
    if (typeof value === "undefined" || typeof value === null) return false
    if (typeof value === "string" && value.trim().length == 0) return false
    return true
}

const createIntern = async function(req, res){
    try{
        let {name, email, mobile, collegeName} = req.body

        if(!isValid(name)){
            return res.status(404).send({status:false, Message:"Name not found!"})
        }

        if(!email){
            return res.status(404).send({status:false, message:"email not found!"})
        }


        let isEmailValid = emailValidator.validate(email)

        if(!isEmailValid){
            return res.status(400).send({status:false, Message:"Email is Invalid!"})
        }

        const isEmailNotUnique = await internModel.findOne({email : email})

        if(isEmailNotUnique){
            return res.status(400).send({status: false, message: "email already exist"})
        }
        
      if(!isValid(collegeName)){
            return res.status(404).send({status:false, message:"collegename is Invalid!"})
        }
        let isCollege= await collegeModel.findOne({name:collegeName})
        
                if(!isCollege){
                    return res.status(404).send({stsus:false,message:"No college found with given Name!"})
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

        const newIntern = {
            name:name,
            mobile:mobile,
            email:email,
            collegeId:isCollege._id,
        }

        
        const intern =await internModel.create(newIntern)
      

        if(!intern){
            return res.status(400).send({status:false,mesage:"No intern is Created!"})
        }

        return res.status(200).send({status:true, document:intern})
            
        }
    catch(err){
        res.status(500).send({msg:err.message})
    }

}


module.exports.createIntern = createIntern