<template>
    <div class="course-directory" >
      <h2>Course Directory</h2>
      
      <div class="search-filter">
        <div class="search-box">
          <font-awesome-icon class="search-icon" :icon="['fas','search']" />
          <input 
            type="text" 
            v-model="query" 
            placeholder="Search by course title or code..." 
            class="search-input"
          />
        </div>
  
        <div class="filter-dropdown">
          <label for="filter">Filter by:</label>
          <select @change="search" v-model="filter" id="filter">
            <option v-for="filter,key in filters" :key="filter" :value="filter">
              {{ key }}
            </option>
          </select>
        </div>
      </div>
  
  
      <h1>Table of Courses</h1>
      
      <table class="course-table">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Course Code</th>
            <th>Units</th>
            <th>Department</th>
            <th>Level</th>
            
          </tr>
        </thead>
        <tbody>
          <CourseField class="coursefield" @delete="deleteCourse" @update="updateCourse" :course="course" v-for="course in courses" :key="course.code" />
        </tbody>
      </table>
      <button class="add-course-btn" @click="dialogVisible = true">Add New Course</button>
    </div>
    <div class="add-dialog" v-show="dialogVisible">
      <form @submit.prevent="addCourse">
          <div>
            <h4>Add a course</h4>
            <button type="button" @click="dialogVisible=false">close</button>
          </div>
        <fieldset>
          <label >
            Course Code
          </label>
          <input  type="text" v-model="code" />
        </fieldset>
        
        <fieldset>
          <label >
            Course Title
          </label>
          <input type="text" v-model="title" />
        </fieldset>
        
        <fieldset>
          <label >
            Course Units
          </label>
          <input type="number" v-model="unit" />
        </fieldset>
        
        <fieldset>
          <label >
            Department
          </label>
          <input type="text" v-model="department" />
        </fieldset>
        
        <fieldset>
          <label >
            Level
          </label>
          <input type="number" v-model="level" step="100" min="100" max="500" />
        </fieldset>

        <input type="submit"  value="Add Course" class="addbtn">

      </form>
    </div>
  </template>
  
  <script>
  import { ref, getCurrentInstance } from 'vue';
  import { lecturerAuth } from '@/composables/lecturerAuth';
  import CourseField from '@/components/CourseField.vue';
  
  
  export default {
    name: "CourseDirectory",
    components:{
      CourseField,
  },
    setup() {
      const url = getCurrentInstance().proxy.url;
      const dialogVisible = ref(false);
      // Sample data for courses
      const courses = ref([]);
  
      const query = ref('');
      const filter = ref('');
      const filters = ref({"Department":"department", "Course Title":"title", "Units":"unit", "Level":"level", "Course Code":"code"});
      const profile = lecturerAuth().lecturer
      const department = ref(profile.value.department);
      const code = ref('');
      const title = ref('');
      const unit = ref(0);
      const level = ref(100);

      const updateCourse = () =>{
        loadCourses()
      }
      
      const deleteCourse = (course) => {
        console.log(course);
        fetch(`${url}/course/delete`, {method:"delete", body:course})
        .then((res => res.text()))
        .then(res => alert(res))
        .catch((err => alert(err)))
        .finally(()=>{
          loadCourses()
        })
      };
  
      const addCourse = async () => {
        // Implement logic to add a new course
        let query = await fetch(`${url}/course/addcourse?code=${encodeURIComponent(code.value)}&department=${encodeURIComponent(department.value)}&title=${encodeURIComponent(title.value)}&level=${encodeURIComponent(level.value)}&unit=${encodeURIComponent(unit.value)}`);
        let response = await query.text();
        alert(response);
        dialogVisible.value=false;
        loadCourses();
      };

      const loadCourses = () =>{
        fetch(`${url}/course/courses?field=department&value=${encodeURIComponent(department.value)}`)
      .then(res => res.json())
      .then(res =>{
        courses.value = res.result;
        console.log(courses.value)
      })
      };

      const search = () => {
        console.log(filter.value, query.value)
        fetch(`${url}/course/search?filter=${encodeURIComponent(filter.value)}&query=${encodeURIComponent(query.value)}`)
        .then(res => res.json())
        .then(res => {
          console.log(res.result)
          courses.value=res.result
        })
      }
  
     
  
      return {
        courses,
        query,
        search,
        filter,
        dialogVisible,
        filters,
        url,
        addCourse,
        loadCourses,
        updateCourse,
        deleteCourse,
        code,
        title,
        unit,
        level,
        department
      };
    },
    mounted(){
      this.loadCourses();
    }
  };
  </script>
  
  <style scoped>
  .course-directory {
    max-width: 800px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    color: #333;
    position: relative;
  }
  
  h1, h2 {
    color: #2c3e50;
  }
  
  h1 {
    text-align: left;
  }
  
  h2 {
    text-align: center;
  }
  
  .search-box {
    position: relative;
  }
  
  .search-icon {
    color: grey;
    position: absolute;
    left: 5%;
    top:25%;
  }
  
  .search-filter {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    gap: 1em;
    margin-bottom: 1rem;
    flex-direction: column;
  }
  
  .search-filter input, .search-filter select {
    background-color: lightgrey;
  }
  
  .search-input {
    width: 75%;
    flex: 1;
    padding: 0.5rem 2rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 0.5rem;
  }
  .filter-dropdown {
    display: flex;
    align-items: center;
  }
  
  .filter-dropdown label {
    margin-right: 0.5rem;
  }
  
  .filter-dropdown select {
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .add-course-btn {
    width:90%;
    background-color: #6c5ce7;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    margin-top: 2rem;
  }
    
  .course-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  .course-table th{
    padding: 0.25rem;
    border: none;
    text-align: left;
  }

  .course-table th {
    font-weight: bold;
    color: #2c3e50;
    font-size: 0.9em;
  }
 
  .add-dialog{
    position:absolute;
    height: 80vw;
    width: 84vw;
    bottom:40vw;
    left: 6vw;
    padding:4vw;
    background-color: whitesmoke;
    border:1px solid lightgray;
    border-radius: 0.75em;
  }  

  .add-dialog > form{
    height:100%;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
  }

  .add-dialog fieldset{
    border:none;
    margin: 0.2em auto 0;
    display:grid;
    grid-template-columns: 2fr 3fr;
    width:95%;
    gap:5%;
  }


  .add-dialog label::after{
    content: ":";
  }

  .add-dialog input{
    border:1px solid lightgrey;
    border-radius: 0.5em;
    padding:0.25em ;
  }

  .add-dialog div{
    display: flex;
    position: relative;
    width: 100%;
    justify-content: center;
  }

  .add-dialog div button{
    position: absolute;
    right:0%;
    top:5%;
    background-color: #6c5ce7;
    color:white;
    padding:0.25em 0.5em;
    border-radius:0.5rem;
    border:1px solid black;
  }
  
  .add-dialog .addbtn{
    background-color: #6c5ce7;
    color:white;
    padding:0.5em;
    border-radius:0.5rem;
    border:1px solid gray;
    font-size:1rem;
  }

  .coursefield{
    width:100%;
  }
  </style>