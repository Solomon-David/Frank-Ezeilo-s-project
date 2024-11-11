<template>
    <div class="result-container">
        <button type="button" @click="close" class="dialog">close</button>
      <!-- First Section: Student Information -->
      <section class="student-info">
        <h2>Student Information</h2>
        <p><strong>Matno:</strong> {{ student.matno }}</p>
        <p><strong>Level:</strong> {{ student.level }}</p>
        <p><strong>CGPA:</strong> {{ student.cgpa }}</p>
      </section>
  
      <!-- Second Section: Courses Table -->
      <section class="courses-info">
        <h2>Courses Information</h2>
        <table>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Title</th>
              <th>Unit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(course, index) in courses" :key="index">
              <td>{{ course.code }}</td>
              <td>{{ course.title }}</td>
              <td>{{ course.unit }}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "StudentResult",
    props: {
      // Student data as a prop
      student: {
        type: Object,
        required: true,
      },
      // Array of course objects as a prop
      courses: {
        type: Array,
        required: true,
      },
    },
    methods:{
        close(){
            this.$emit("close")
        }
    },
    mounted(){
        console.log(this.courses)
    }
  };
  </script>
  
  <style scoped>
    .dialog{
        position: absolute;
    right: 0%;
    top: 5%;
    background-color: #6c5ce7;
    color: white;
    padding: 0.25em 0.5em;
    border-radius: 0.5rem;
    border: 1px solid black;
    }

  .result-container {
    padding: 20px;
    position:relative;
    max-width: 800px;
    height:max-content;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .student-info,
  .courses-info {
    margin-bottom: 30px;
  }
  
  .student-info p {
    font-size: 18px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  table th, table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  table th {
    background-color: #f4f4f4;
  }
  
  table tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  </style>
  