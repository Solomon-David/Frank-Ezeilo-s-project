const router = require("express").Router();
const { pool, executeQuery } = require('./../db');


router.post("/register", async (req,res)=>{
    console.log(req.body)
    let {fullname, matricNumber, level, department,password} =  req.body;
    const query = "SELECT * FROM student WHERE matno = ?";
    const values = [matricNumber];
    try {
        const result = await executeQuery(query, values);
        if (result.length > 0) {
            res.status(400).json({ message: "User already exists" });
        } else {
            const insertQuery = "INSERT INTO student (fullname, matno, department, password, level) VALUES (?, ?, ?, ?, ?)";
    const insertValues = [fullname, matricNumber, department, password, level];
            await executeQuery(insertQuery, insertValues);
            
            res.json({ message: "User added successfully", fullname, matricNumber,department, level});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }

    
});

router.post("/login", async (req,res) =>{
    const {matno, password} = req.body;
    console.log(matno, password);
    const sql = "select fullname, matno, department, level, scores from student where matno = ? and password = ?";
    const values = [matno, password];
    try {
        let result = await executeQuery(sql, values);
        if (result.length > 0) {
            console.log(result[0]);
            res.json(result[0]);
            }
        else {
            res.status(400).json({ message: "Invalid username or password" });
        }
        } catch (err) {
            console.error(err);
                res.status(500).json({ message: "Internal Server Error" });
        }
});

router.patch('/profile', async (req, res) => {
    const { field, oldvalue, newvalue } = req.query;
    console.log(field, oldvalue, newvalue)
    try {
        const sql = `update student set ${field} = ? where ${field} = ?`;
        const params = [newvalue, oldvalue]
        
        let result = await executeQuery(sql, params);
        if (result) {
            console.log("updated")
            const sql2 = `select * from student where ${field} = ?`;
            const params2 = [newvalue];
            let result2 = await executeQuery(sql2, params2);
            if(result2){
                res.status(200).json({result:result2[0]})
            }
            }
        else {
            res.status(400).send( "Invalid username or password" );
        }
        } catch (err) {
            console.error(err);
                res.status(500).send("Internal Server Error" );
        }
});

router.get('/students', async (req,res)=>{
    const {field, value} = req.query;
    const sql = `select fullname, matno, department from student where ${field} like ?`;
    const params = [value+"%"];

    const result = await executeQuery(sql, params);
    if(result){
        console.log(result)
        res.status(200).json({result:result})
    }
    else{
        res.status(200).send("nope")
    }
})

module.exports = router;