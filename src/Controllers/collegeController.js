const collegeModel = require("../Models/collegeModel")
const internModel = require("../Models/internModel")

const isValid = function (value) {
    if (typeof value === "undefined" || typeof value === null) return false
    if (typeof value === "string" && value.trim().length == 0) return false
    return true
}

const isValidURL = function (str) {
   let  pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}
    
const createCollege = async function (req, res) {
 try{
    let {name, fullName, logoLink } = req.body

        if(!isValid(name)){
            return res.status(400).send({status:false, message:"name is required"})
        }
        
        if(!isValid(fullName)){
            return res.status(400).send({status:false, message:"Full name is required!"})
        }

        if(!isValidURL(logoLink)){
           return res.status(400).send({status:false, message:"Logo Link is required!"})
        }
        let isCollegeNameNotUnique =  await collegeModel.findOne({name : name})

        console.log(isCollegeNameNotUnique);

        if(isCollegeNameNotUnique){

            return res.status(400).send({status:false, message:"College is already Exists!"})
        }


        let college = await collegeModel.create(req.body)    
        if(!college){
            return res.status(400).send({status:false,message:"college not created! "})
        }

        return res.status(201).send({status:true, data:college})

 }catch(err){
     res.status(500).send({msg:err.message})
 }
}



const getCollegeDetails = async function(req, res){
    try {
        let collegeName = req.query.collegeName

        let college = await collegeModel.findOne({name:collegeName})
        console.log(college);
        if(!college){
            return res.status(404).send({status:false, message:"No college found!"})
        }

        let Id = college._id
        console.log(Id);
        let interns = await internModel.find({collegeId : Id }).select({_id: 1, email: 1, name: 1, mobile: 1})
      ;
        if(!interns){
            return res.status(404).send({status:false, message:"No interns found!"})
        }

        const Data = {
            name:college.name,
            fullName:college.fullName,
            logoLink:college.logoLink,
            interests:interns
        }
        return res.status(201).send({status:true, data:Data})
        
        
    } catch (error) {
        res.status(500).send({msg:error.message})
    }
}


module.exports.createCollege = createCollege
module.exports.getCollegeDetails = getCollegeDetails