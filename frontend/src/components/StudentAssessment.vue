<template>
    <div class="assessment-container">
      <header>
        <h1>SRAS</h1>
      </header>
  
      <section class="student-info">
        <h2>Student Assessment</h2>
        <p>Overview of current semester performance</p>
        <form action="" class="search">
        <div >
          <input type="text" v-model="matno" name="matno" placeholder="Matric number"/>
          <input type="text" v-model="department" name="department" placeholder="Department"/>
        </div>
        <div>
          <button @click.prevent="search">Find Student</button>
        </div>
        </form>

        <div class="student-details">
          <h3>{{ student.fullname }}</h3>
          <p>{{ student.matno }}</p>
        </div>
      </section>
  
      <section class="performance-cards">
        <div class="card">
          <h3>{{ Number(student.cgpa).toFixed(2) }}</h3>
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
            <GradingComponent
                v-for="(course, index) in student.courses"
                :key="course.code+course.test1+course.test2+course.exam"
                :course="course"
                :index="index"
                @updateScore="update"
              />
          </tbody>
        </table>
      </section>
    </div>
  </template>
  
  <script>
   import { ref, reactive, getCurrentInstance } from 'vue';
   import { lecturerAuth } from '@/composables/lecturerAuth';
import GradingComponent from './GradingComponent.vue';

  export default {
    components: {
      GradingComponent
    },
    setup(){
      // Sample data for students
      const student = reactive({
        fullname:'',
        matno:'',
        courses:[{
          code:'',
          test1:0,
          test2:0,
          exam:0,
          total:0
        }],
        cgpa:0
      });
      const matno = ref('');
      const profile = lecturerAuth().lecturer;
      const department = ref(profile.value.department);
      const {proxy} = getCurrentInstance();
      const url = proxy.url;

      const search = () =>{
        fetch(`${url}/student/studentgrades?matno=${encodeURIComponent(matno.value)}&department=${encodeURIComponent(department.value)}`)
      .then(res => res.json())
      .then(res =>{
        Object.assign(student,res)
          console.log(student)
      })
      }

      const update = (code, field, value) =>{
        console.log(code, field, value)
        fetch(`${url}/student/updategrades`,
        {method:"PATCH",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({
            matno:matno.value,
            code,
            field,
            value
          })

        }
      )
      .then(()=> search())

      }

      return{
        matno,
        profile,
        department,
        student,
        search,
        update
      }
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
  
  .grades-table th{
    padding: 10px;
    border-bottom: 1px solid #ddd;
    text-align: left;
    background-color: #f4f6f7;
    font-size: 0.8em;
  }

 .grades-table th {
  }
  

  .search{
    display: flex;
    flex-direction: column;
  }

  .search div{
    display: flex;
    justify-content: center;
    margin: 2.5% auto;
  }

  .search div:nth-of-type(1){
    justify-content: center;
    gap:5.5%;
    width:100%;
  }

  .search div:nth-of-type(1) input{
    width:35%;
    border-radius: 5rem;
    padding:0.3rem;
    padding-left: 0.3rem;
  }

  .search div:nth-of-type(2){
    justify-content: center;
    width:100%;
  }

  .search div:nth-of-type(2) button{
    width:80%;
    border-radius: 0.4rem;
    padding:0.4rem;
    background-color: #6c5ce7;
    color:white;
  }
  
  .search div:nth-of-type(2) button:active{ 
    
    color: #6c5ce7;
    background-color:white;
  }
  </style>
  