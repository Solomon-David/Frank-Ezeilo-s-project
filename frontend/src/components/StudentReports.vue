<template>
    <div class="student-reports">
      <header class="header">
        <h1>SRAS</h1>
      </header>
  
      <section class="report-section">
        <h2>Student Reports</h2>
        <p>This table provides an overview of student scores across various courses.</p>
        
        <div class="course-table">
          <div class="searchbar">
            <h3>Course: </h3> <input v-model="code"  name="course"/>
            <button class="search" @click="getStudents">Search</button>
          </div>
          <div class="table-content">
            <div class="studentheading">
              <span class="student-head" v-for="(header) in headers" :key="header">{{ header }}</span>

            </div>
            <div v-for="(student, index) in students" :key="index" class="student-row">
              <span class="student-name">{{ student.fullname }}</span>
              <span class="student-matno">{{ student.matno }}</span>
              <span class="student-score"> {{ grade(student.score) }}  <span>({{ student.score }})</span></span>
            </div>
          </div>
        </div>
      </section>
  
     
    </div>
  </template>
  
  <script>
  import { ref,getCurrentInstance } from 'vue';
  export default {
    name: 'StudentReports',
    setup() {
    // Define reactive references
    const students = ref([]);
    const code = ref('');
    const headers = [
      "full name",
      "matric number",
      "score"
    ];

    // Get the `url` from the current instance proxy
    const { proxy } = getCurrentInstance();
    const url = proxy.url;

    // Methods
    const addStudent = () => {
      // Functionality for adding a new student entry
      console.log('Add student button clicked');
    };

    const grade = (total) => {
      switch (true) {
        case total > 74:
          return 'A';
        case total > 64:
          return 'B';
        case total > 54:
          return 'C';
        case total > 44:
          return 'D';
        case total > 34:
          return 'E';
        default:
          return 'F';
      }
    };

    const getStudents = () => {
      fetch(`${url}/student/studentandgrades?code=${encodeURIComponent(code.value)}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          students.value = res;
        });
      console.log(students.value);
    };

    // Return all the variables and functions to make them accessible in the template
    return {
      url,
      code,
      students,
      headers,
      addStudent,
      grade,
      getStudents
    };
  }
};


  </script>
  
  <style scoped>

  .student-reports {
    text-align: center;
    padding: 0 20px;
  }
  
  .header h1 {
    color: #1a1a86;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .report-section {
    margin: 20px 0;
  }
  
  .report-section h2 {
    font-size: 20px;
    color: #2a2a2a;
  }
  
  .report-section p {
    font-size: 14px;
    color: #4a4a4a;
    text-align:left;
  }
  
  .course-table {
    background-color: #f9f9f9;
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
  }
  
  .course-table h3 {
    font-size: 18px;
    color: #1a1a86;
    text-align: left;
  }
  
  .table-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .student-row, .studentheading {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
    text-transform: capitalize;
  }

  .studentheading{
    font-size: 1.1rem;
  }

  .student-row{
    font-size: 0.9rem;
  }
  
  .student-name {
    color: #4a4a4a;
  }
  
  .student-score {
    color: #1a1a86;
  }

  .student-score span{
    font-size: 0.8rem;
  }

  .searchbar{
    display: flex;
    align-items: baseline;
    gap:2.5%;
  }

  .search{
    background-color: #6c5ce7;
    color: white;
    padding: 0.25em 0.5em;
    border-radius: 0.5rem;
    border: 1px solid black;
  }
  
  </style>
  