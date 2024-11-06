<template>
    <div class="assessment-container">
      <header>
        <h1>SRAS</h1>
      </header>
  
      <section class="student-info">
        <h2>Student Assessment</h2>
        <p>Overview of current semester performance</p>
        <div class="student-details">
          <h3>{{ student.name }}</h3>
          <p>{{ student.matricNumber }}</p>
        </div>
      </section>
  
      <section class="performance-cards">
        <div class="card">
          <h3>{{ student.gpa }}</h3>
          <p>GPA</p>
        </div>
        <div class="card">
          <h3>{{ student.cgpa }}</h3>
          <p>CGPA</p>
        </div>
      </section>
  
      <section class="grades-table">
        <h2>Grades Table</h2>
        <table>
          <thead>
            <tr>
              <th>Course</th>
              <th>Test 1</th>
              <th>Test 2</th>
              <th>Exam</th>
              <th>Total</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="grade in student.grades" :key="grade.course">
              <td>{{ grade.course }}</td>
              <td>{{ grade.test1 }}</td>
              <td>{{ grade.test2 }}</td>
              <td>{{ grade.exam }}</td>
              <td>{{ grade.total }}</td>
              <td>{{ grade.grade }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        student: {
          name: 'Emily Johnson',
          matricNumber: 'DE.2019/1234',
          gpa: 3.8,
          cgpa: 3.6,
          grades: [
            { course: 'Eng 432', test1: 10, test2: 10, exam: 59, total: 79, grade: 'A' },
            { course: 'Eng 432', test1: 10, test2: 10, exam: 59, total: 79, grade: 'A' },
            { course: 'Eng 432', test1: 10, test2: 10, exam: 59, total: 79, grade: 'A' },
            { course: 'Eng 432', test1: 10, test2: 10, exam: 59, total: 79, grade: 'A' },
            { course: 'Eng 432', test1: 10, test2: 10, exam: 59, total: 79, grade: 'A' },
          ],
        },
      };
    },
    methods: {
      
    },
  };
  </script>
  
  <style scoped>
  .assessment-container {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  
  header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .back-btn {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .student-info h2 {
    margin: 0;
    font-size: 1.5rem;
    color: #2c3e50;
  }
  
  .student-info p {
    color: #7f8c8d;
    margin: 5px 0;
  }
  
  .student-details {
    margin: 15px 0;
  }
  
  .performance-cards {
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
  }
  
  .card {
    background-color: #ecf0f1;
    padding: 20px;
    border-radius: 10px;
    width:30%;
  }
  
  .card h3 {
    margin: 0;
    font-size: 2rem;
  }
  
  .card p {
    color: #7f8c8d;
    margin: 0;
  }
  
  .grades-table {
    margin-top: 20px;
  }
  
  .grades-table table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .grades-table th, .grades-table td {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }
  
  .grades-table th {
    background-color: #f4f6f7;
  }
  
  .grades-table td {
    font-size: 0.9rem;
  }
  </style>
  