const express = require('express');
const router = express.Router();
const bodyParser  = require('body-parser');


// Import the other routers
const studentRouter = require('./student');
const lecturerRouter = require('./lecturer');
const courseRouter = require('./course');

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

router.use("/student",studentRouter);
router.use("/lecturer",lecturerRouter);
router.use("/course",courseRouter);





// Export the main router
module.exports = router;