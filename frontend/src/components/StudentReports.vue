<template>
    <div class="student-reports">
      <header class="header">
        <h1>SRAS</h1>
      </header>
  
      <section class="report-section">
        <h2>Student Reports</h2>
        <p>This table provides an overview of student grades across various courses.</p>
        
        <div class="course-table">
          <h3>Course: ENG 432</h3>
          <div class="table-content">
            <div v-for="(student, index) in students" :key="index" class="student-row">
              <span class="student-name">{{ student.name }}</span>
              <span class="student-grade">{{ student.grade }}</span>
            </div>
          </div>
        </div>
      </section>
  
      <button @click="addStudent" class="add-button">
        <span>+ Add</span>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StudentReports',
    data() {
      return {
        students: [
          { name: 'Franklin Ezeilo', grade: 98 },
          { name: 'Franklin Ezeilo', grade: 98 },
          { name: 'Franklin Ezeilo', grade: 98 },
          { name: 'Franklin Ezeilo', grade: 98 },
          { name: 'Franklin Ezeilo', grade: 98 },
          { name: 'Franklin Ezeilo', grade: 98 }
        ]
      };
    },
    methods: {
      addStudent() {
        // Functionality for adding a new student entry (could open a modal or navigate to a new page)
        console.log('Add student button clicked');
      }
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
  
  .student-row {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #e0e0e0;
    width: 100%;
  }
  
  .student-name {
    font-size: 16px;
    color: #4a4a4a;
  }
  
  .student-grade {
    font-size: 18px;
    color: #1a1a86;
  }
  
  .add-button {
    background-color: #7962f2;
    color: white;
    padding: 10px 20px;
    border-radius: 10px;
    font-size: 16px;
    margin-top: 20px;
    border: none;
    cursor: pointer;
    width:100%;
  }
  
  .add-button span {
    font-size: 16px;
  }
  </style>
  