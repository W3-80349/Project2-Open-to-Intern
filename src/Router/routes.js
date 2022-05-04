const express = require('express')
const router = express.Router()
const internController = require("../Controllers/interController")
const collegeController = require("../Controllers/collegeController")


router.post("/functionup/colleges", collegeController.createCollege)

router.post("/functionup/interns", internController.createIntern)

router.get("/functionup/collegeDetails",collegeController.getCollegeDetails )


module.exports = router    
   