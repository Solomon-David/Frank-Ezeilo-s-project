require("dotenv").config();
const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


// database connection
const { pool} = require('./db');
  
const apis = require("./apis/apis.js");

// using cors
app.use(cors());

// api calls from Vue app
app.use("/api", apis);

// Serve Vue app


app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get("/", function(req,res){
    console.log("Connected");
    res.send("Connected")
})

// Handle all other routes
// app.get('*', (req, res) => {
//  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
// });

app.listen(port, () => {
console.log(`Server is running on port ${port}`);
});

process.on('exit', () => {
    pool.end((err) => {
      if (err) {
        console.error('Error closing the pool:', err);
      } else {
        console.log('Database pool closed.');
      }
    })
    });