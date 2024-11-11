const router = require("express").Router();
const { pool, executeQuery } = require('./../db');

// Lecturer registration endpoint
router.post("/register", async (req, res) => {
    console.log(req.body);
    const { fullname, staffId, department, password, email, level } = req.body;
    const query = "select * from lecturer where staffid = ?";
    const values = [staffId];
    
    try {
        const result = await executeQuery(query, values);
        if (result.length > 0) {
            res.status(400).json({ message: "User already exists" });
        } else {
            const insertquery = "insert into lecturer (fullname, staffid, department, email, password) values (?, ?, ?, ?, ?)";
            const insertValues = [fullname, staffId, department, email, password];
            await executeQuery(insertQuery, insertValues);
            
            res.json({ message: "Lecturer added successfully", fullname, staffId, department, level });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Lecturer login endpoint
router.post("/login", async (req, res) => {
    const { staffId, password } = req.body;
    console.log(staffId, password);
    const sql = "select fullname, staffid, department, email from lecturer where staffid = ? and password = ?";
    const values = [staffId, password];
    
    try {
        const result = await executeQuery(sql, values);
        if (result.length > 0) {
            console.log(result[0]);
            res.json(result[0]);
        } else {
            res.status(400).json({ message: "Invalid username or password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Lecturer profile update endpoint
router.patch('/profile', async (req, res) => {
    const { field, oldvalue, newvalue } = req.query;
    console.log(field, oldvalue, newvalue);
    
    try {
        const sql = `update lecturer set ${field} = ? where ${field} = ?`;
        const params = [newvalue, oldvalue];
        
        const result = await executeQuery(sql, params);
        if (result) {
            console.log("updated");
            const sql2 = `select * from lecturer where ${field} = ?`;
            const params2 = [newvalue];
            const result2 = await executeQuery(sql2, params2);
            
            if (result2) {
                res.status(200).json({ result: result2[0] });
            }
        } else {
            res.status(400).send("Invalid data");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
