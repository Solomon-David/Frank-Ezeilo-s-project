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
  const createResultTable=`
  CREATE TABLE IF NOT EXISTS Result (
  student varchar(20) not null,
  code varchar(10),
  test1 decimal(5,2) default 0.0,
  test2 decimal(5,2) default 0.0,
  exam decimal(5,2) default 0.0,
  total decimal(5,2) as (test1 + test2 + exam) stored,
  grade TINYINT AS (
        CASE
            WHEN total > 74 THEN 5
            WHEN total > 64 THEN 4
            WHEN total > 55 THEN 3
            WHEN total > 45 THEN 2
            WHEN total > 35 THEN 1
            WHEN total > 25 THEN 0
            ELSE NULL
        END
    ) VIRTUAL,
  foreign key (code) references course(code) on update cascade on delete cascade,
  foreign key (student) references student(matno) on update cascade on delete cascade,
  primary key (student, code)
  )`;
  
  const createStudentTable = `
    CREATE TABLE IF NOT EXISTS Student (
      matno VARCHAR(20) PRIMARY KEY,
      fullname VARCHAR(100) NOT NULL,
      department VARCHAR(100),
      courses JSON,
      password varchar(20),
      level INT CHECK (level IN (100, 200, 300, 400, 500))
    )`;

  const createCourseTable = `
    CREATE TABLE IF NOT EXISTS Course (
      code VARCHAR(10) PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      unit INT NOT NULL,
      level INT CHECK (level IN (100, 200, 300, 400, 500)),
      department VARCHAR(100)
    )`;
 
  const createLecturerTable = `
    CREATE TABLE IF NOT EXISTS Lecturer (
    staffId VARCHAR(20) PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE
)`;

  try {
    await executeQuery(createStudentTable);
    console.log('Student table created or already exists.');
    await executeQuery(createCourseTable);
    console.log('Course table created or already exists.');
    await executeQuery(createLecturerTable);
    console.log('Lecturer table created or already exists.');
    await executeQuery(createResultTable);
    console.log('Result table created or already exists.');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

// Call createTables to set up tables upon import
createTables();

// Export the pool and executeQuery function for use in other files
module.exports = { pool, executeQuery };
