// db.js
const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.DBHOST,        // Replace with your MySQL host
  user: process.env.DBUSER,             // Replace with your MySQL username
  password: process.env.DBPASS,             // Replace with your MySQL password
  database: process.env.DBNAME, // Replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Utility function to execute a query
function executeQuery(query,values) {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (err, results) => {
      if (err) {
        console.error('Error executing query:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

// Create the tables if they don't exist
const createTables = async () => {
  const createStudentTable = `
    CREATE TABLE IF NOT EXISTS Student (
      matno VARCHAR(20) PRIMARY KEY,
      fullname VARCHAR(100) NOT NULL,
      department VARCHAR(100),
      scores JSON,
      password varchar(20),
      level INT CHECK (level IN (100, 200, 300, 400, 500))
    )`;

  const createCourseTable = `
    CREATE TABLE IF NOT EXISTS Course (
      code VARCHAR(10) PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      unit INT NOT NULL,
      department VARCHAR(100)
    )`;

  const createLecturerTable = `
    CREATE TABLE IF NOT EXISTS Lecturer (
      empno VARCHAR(20) PRIMARY KEY,
      fullname VARCHAR(100) NOT NULL,
      department VARCHAR(100)
    )`;

  try {
    await executeQuery(createStudentTable);
    console.log('Student table created or already exists.');
    await executeQuery(createCourseTable);
    console.log('Course table created or already exists.');
    await executeQuery(createLecturerTable);
    console.log('Lecturer table created or already exists.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

// Call createTables to set up tables upon import
createTables();

// Export the pool and executeQuery function for use in other files
module.exports = { pool, executeQuery };
