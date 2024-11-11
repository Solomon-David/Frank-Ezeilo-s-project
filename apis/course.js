const router = require("express").Router();
const { pool, executeQuery } = require('./../db');

router.get("/addcourse", async (req,res) =>{
    const { code, title, unit, department, level} = req.query;

    const sql = "insert into course(code,title,unit,department,level) values(?,?,?,?,?)";
    const params = [code,title,unit,department,level];

    const query = await executeQuery(sql, params);
    if(query){
        res.status(200).send("Successfully added "+code);
    }
    else{
        res.status(200).send("An error occured");
    }
});

router.get('/courses', async (req,res)=>{
    const {field, value} = req.query;
    const sql = `select code, title, unit, department, level from course where ${field} like ?`;
    const params = [value];

    const result = await executeQuery(sql, params);
    if(result){
        console.log(result)
        res.status(200).json({result:result})
    }
    else{
        res.status(200).send("nope")
    }
});

router.patch("/editcourse", async (req,res)=>{
        const { code, title, department, level, unit, oldcode, olddepartment } = req.query;
        console.log(code, title, department, level, unit, oldcode, olddepartment)
        try {
            
            const sql = `update course set code = ?, title = ?, department = ?, level = ?, unit = ?  where code = ? and department = ?`;
            const params = [code, title, department, level, unit, oldcode, olddepartment]
            console.log(params)
            let result = await executeQuery(sql, params);
            if (result) {
                console.log("updated")
                res.status(200).send("Updated "+oldcode)
                }
            else {
                res.status(400).send( "Invalid username or password" );
            }
            } catch (err) {
                console.error(err);
                    res.status(500).send("Internal Server Error" );
            }
});

router.get("/search", async (req,res)=>{
    const {filter, query} = req.query;
    console.log(filter, query);
    let sql, params;
    if(parseInt(query) instanceof Number){
        sql = `select department, level, code, unit, title from course where ${filter} = ?`;
        params = [query];
    }
    else{
        sql = `select department, level, code, unit, title from course where ${filter} like ?`;
        params = [`%${query}%`]
    }
    
    const result = await executeQuery(sql, params);
    console.log(result);
    res.json({result});
});

router.get("/studentcourses", async (req,res)=>{
    const {department, level} = req.query;
    console.log(department, level);
    
    let sql = "select level, code, unit, title from course where department = ? and level = ?";
    let params = [department, level];
    let result = await executeQuery(sql,params);
    console.log(result);
    res.json(result);
});

router.get("/studentsearch", async (req,res)=>{
    const {field, value, department} = req.query;
    console.log(field, value, department);
    let sql, params;
    if(parseInt(value) instanceof Number){
        sql = `select level, code, unit, title from course where ${field} = ? and department = ?`;
        params = [value, department];
    }
    else{
        sql = `select level, code, unit, title from course where ${field} like ? and department = ?`;
        params = [`%${value}%`, department];
    }
    
    const result = await executeQuery(sql, params);
    console.log(result);
    res.json(result);
});

router.get('/getRegistered/:matno', async (req,res)=>{
    let {matno} = req.params;
    let sql = "select code from result where student = ?";
    const output = await executeQuery(sql, [matno]);
    const result = output.map(x => x.code);
    res.json(result);
});

router.post('/register', async (req,res)=>{
    try{
    const {matno, code} = req.body;
    console.log(matno, code);
    let sql = "insert into result(student,code) values(?,?)";
    let result = await executeQuery(sql, [matno,code]);
    res.status(201).send("Registered "+code)
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
});

router.delete('/unregister', async (req, res) => {
    try {
        const { matno, code } = req.body;
        console.log(matno, code);
        
        // SQL query to delete the record from the result table based on student number (matno) and course code (code)
        let sql = "delete from result where student = ? and code = ?";
        let result = await executeQuery(sql, [matno, code]);
        
        // If no rows were deleted, it means the student-course combination didn't exist
        if (result.affectedRows === 0) {
            return res.status(404).send("No record found to unregister for student " + matno + " and course " + code);
        }

        // Send a success message if the record was deleted
        res.status(200).send("Unregistered student " + matno + " from course " + code);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});





module.exports = router;