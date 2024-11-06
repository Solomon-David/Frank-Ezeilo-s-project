const router = require("express").Router();
const { pool, executeQuery } = require('./../db');

router.get("/", (req,res)=>{
    res.send("Working");
});

module.exports = router;