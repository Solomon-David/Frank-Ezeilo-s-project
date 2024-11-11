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
  create table if not exists result (
  student varchar(20) not null,
  code varchar(10),
  test1 decimal(5,2) default 0.0,
  test2 decimal(5,2) default 0.0,
  exam decimal(5,2) default 0.0,
  total decimal(5,2) as (test1 + test2 + exam) stored,
  grade tinyint as (
        case
            when total > 74 then 5
            when total > 64 then 4
            when total > 55 then 3
            when total > 45 then 2
            when total > 35 then 1
            when total > 25 then 0
            else null
        end
    ) virtual,
  foreign key (code) references course(code) on update cascade on delete cascade,
  foreign key (student) references student(matno) on update cascade on delete cascade,
  primary key (student, code)
  )`;
  
  const createStudentTable = `
    create table if not exists student (
      matno varchar(20) primary key,
      fullname varchar(100) not null,
      department varchar(100),
      courses json,
      password varchar(20),
      level int check (level in (100, 200, 300, 400, 500))
    )`;

  const createCourseTable = `
    create table if not exists course (
      code varchar(10) primary key,
      title varchar(100) not null,
      unit int not null,
      level int check (level in (100, 200, 300, 400, 500)),
      department varchar(100)
    )`;
 
  const createLecturerTable = `
    create table if not exists lecturer (
    staffid varchar(20) primary key,
    fullname varchar(100) not null,
    department varchar(100) not null,
    password varchar(100) not null,
    email varchar(100) unique
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
