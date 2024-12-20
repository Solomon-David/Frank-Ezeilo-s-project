const router = require("express").Router();
const { pool, executeQuery } = require('./../db');


router.post("/register", async (req,res)=>{
    console.log(req.body)
    let {fullname, matno, level, department,password} =  req.body;
    const query = "SELECT * FROM student WHERE matno = ?";
    const values = [matno];
    try {
        const result = await executeQuery(query, values);
        if (result.length > 0) {
            res.status(400).json({ message: "User already exists" });
        } else {
            const insertQuery = "INSERT INTO student (fullname, matno, department, password, level) VALUES (?, ?, ?, ?, ?)";
    const insertValues = [fullname, matno, department, password, level];
            await executeQuery(insertQuery, insertValues);
            
            res.json({ message: "User added successfully", fullname, matno,department, level});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }

    
});

router.post("/login", async (req,res) =>{
    const {matno, password} = req.body;
    console.log(matno, password);
    const sql = "select fullname, matno, department, level from student where matno = ? and password = ?";
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
});

router.delete("/delete/:matno", async (req,res)=>{

    const sql = "delete from student where matno = ?";
    const param = [req.params.matno];

    const result = await executeQuery(sql, param);
    if(result){
        console.log(result);
        res.status(200).send(`Successfully deleted student with matric no ${req.params.matno}`);
    }
    else{
        res.status(200).send("Error");
    }
})

router.get("/studentgrades", async (req,res)=>{
    const {matno, department} = req.query;
    const sql = `SELECT 
  s.matno, 
  s.fullname, 
  JSON_ARRAYAGG(
    JSON_OBJECT(
      'code', r.code,
      'test1', r.test1,
      'test2', r.test2,
      'exam', r.exam,
      'total', r.test1 + r.test2 + r.exam,
      'level', c.level,
      'unit', c.unit
    )
  ) AS courses,
 ROUND(IFNULL(SUM(grade) / SUM(c.unit), 0), 2) AS cgpa
FROM 
  student AS s
JOIN 
  result AS r ON s.matno = r.student
JOIN 
  course AS c ON r.code = c.code
WHERE 
  s.matno = ? 
  AND s.department = ?
GROUP BY 
  s.matno, s.fullname`;

    const params = [matno, department];

    let result = await executeQuery(sql, params);
    console.log(result[0]);

    res.json(result[0]);
});

router.patch("/updategrades", async (req,res)=>{
    const {matno, code, field, value} = req.body;

    const sql = `update result set ${field}=? where student = ? and code = ?`;
    const result = await executeQuery(sql, [value, matno,code]);

    console.log(result);
    res.status(200).send(result)
});

router.get("/studentandgrades", async (req,res)=>{
    const {code} = req.query;
    const sql = `SELECT s.fullname, s.matno, r.total as score
FROM result AS r 
JOIN student AS s 
ON r.student = s.matno 
WHERE r.code = ?;`;
    const result = await executeQuery(sql,[code]);
    console.log(result);
    res.json(result)
});

router.get("/results", async (req,res)=>{
    const { level,semester,matno } = req.query;

    const sql = `select r.code, c.title,c.unit,r.total as score
    from student as s
    join result as r on s.matno = r.student
    join course as c on r.code = c.code
    where s.matno = ? and c.level = ?`;

    const sql2 = `SELECT s.matno, s.level,  ROUND(IFNULL(SUM(r2.grade) / SUM(c2.unit), 0), 2) as cgpa
    FROM result AS r2
    JOIN course AS c2 ON r2.code = c2.code 
    join student as s on r2.student = s.matno 
    where s.matno =?`;
    
    
    const result =await executeQuery(sql,[matno,level]);
    const result2 =await executeQuery(sql2,[matno,]);

    
    console.log("res1",result)
    console.log("res2",result2)
    const merged = Object.assign({}, result2, { result: result })
    console.log("merged",merged)
    res.json(merged)
})
    

module.exports = router;