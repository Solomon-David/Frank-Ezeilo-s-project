<template>
    <div class="course-directory">
      <h2>Courses </h2>
      
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
        <div class="register">
          <div><label for="radio1">All</label><input @click="filterCourses" type="radio" id="radio1" v-model="status" value="all"></div>
          <div><label for="radio2">Registered</label><input @click="filterCourses" type="radio" id="radio2" v-model="status" value="registered"></div>
          <div><label for="radio3">Unregistered</label><input @click="filterCourses" type="radio" id="radio3" v-model="status" value="unregistered"></div>
        </div>
      </div>
  
  
      <h1>Table of Courses</h1>
      
      <table class="course-table">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Course Code</th>
            <th>Units</th>
            <th>Level</th>
            
          </tr>
        </thead>
        <tbody :key="listkey">
          <tr v-for="course in filteredCourses" :key="course.code">
            <td>{{ course.title }}</td>
            <td>{{ course.code }}</td>
            <td>{{ course.unit }}</td>
            <td>{{ course.level }}</td>
            <td>
              <button  @click="registeredCourses.includes(course.code)?unregisterCourse(course.code):registerCourse(course.code)" >
               {{ isRegistered(course.code) }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, getCurrentInstance, computed } from 'vue';
  import { studentAuth } from '@/composables/studentAuth';
  
  export default {
    setup() {
  
      const url = getCurrentInstance().proxy.url;
 const courses = ref([]);
      const listkey = ref(0);
      const query = ref('');
      const filter = ref('');
      const filters = ref({ "Course Title":"title", "Units":"unit", "Level":"level", "Course Code":"code"});
      const profile = studentAuth().student;
      const department = ref(profile.value.department);
      const registeredCourses = ref([]);
      const level = ref(profile.value.level);
      const status = ref("all");
     
  
      const isRegistered = (code) =>{
        return registeredCourses.value.includes(code) ? "Unregister" : "Register";
      }
      
      const unregisterCourse = (code) => {
    // Implement logic to remove a student from a course
    console.log(code);

    fetch(`${url}/course/unregister`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ matno: profile.value.matno, code: code })
        })
        .then(res => res.text())
        .then(res => alert(res))  // Alert the response from the server (success or failure)
        .catch(err => alert(err)); // Alert any errors
        console.log("done");
        window.location.reload()
      };
      
      
      const registerCourse = (code) => {
        // Implement logic to add a new course
        console.log(code);
        
        fetch(`${url}/course/register`, {method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({matno:profile.value.matno, code:code})})
        .then(res => res.text())
        .then(res => alert(res))
        .catch(err => alert(err));
        console.log("done")
        window.location.reload()
      };

      const filteredCourses = computed(()=>{
            let filtered;
            switch(status.value){
              case "all":
                filtered = courses.value;
                break;
                case "registered":
                  filtered = courses.value.filter(x => registeredCourses.value.includes(x.code));
                  break;
                  case "unregistered":
                    filtered = courses.value.filter(x => !registeredCourses.value.includes(x.code));
                    break;
                  }
            return filtered;
      });
  
      const loadCourses = () =>{
        fetch(`${url}/course/studentcourses?department=${encodeURIComponent(profile.value.department)}&level=${encodeURIComponent(profile.value.level)}`)
        .then(res => res.json())
      .then(res =>{
        courses.value = res;
      })

      fetch(`${url}/course/getRegistered/${encodeURIComponent(profile.value.matno)}`)
      .then(reg => reg.json())
      .then(res => {
        registeredCourses.value = res;
      })
      };

      const search = () =>{
        fetch(`${url}/course/studentsearch?field=${encodeURIComponent(filter.value)}&value=${encodeURIComponent(query.value)}&department=${encodeURIComponent(profile.value.department)}`)
        .then(res => res.json())
        .then(res => {
          courses.value = res;
        })
      };



      return {
        
        department,
        search,
        level,
        loadCourses,
        listkey,
        courses,
        query,
        profile,
        status,
        filters,
        filter,
        registeredCourses,
        unregisterCourse,
        registerCourse,
        isRegistered,
        filteredCourses
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
    margin:0 10%;
  }
  
  .filter-dropdown label {
    margin-right: 0.5rem;
  }
  
  .filter-dropdown select {
    padding: 0.25rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 50%;
  }
  
  .register-course-btn {
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
  
  .course-table th, .course-table td {
    padding: 0.25rem;
    border: none;
    text-transform: capitalize;
    text-align: left;
  }
  
  .course-table td{
    font-size: 0.7rem;
    text-align: center;
  }
  
  .course-table td:nth-of-type(3){
    text-transform: uppercase;
  }
  .course-table td:nth-of-type(2){
    text-transform: uppercase;
  }
  
  .course-table th {
    font-weight: bold;
    color: #2c3e50;
    font-size: 0.9em;
  }
  
  .edit-icon, .delete-icon {
    color: #333;
    cursor: pointer;
    margin-right: 8px;
  }
  
  .edit-icon:hover {
    color: #6c5ce7;
  }
  
  .delete-icon {
    color: #6c5ce7;
  }
  
  .delete-icon:hover {
    color: #6c5ce7;
  }

  .register{
    display:flex;
    justify-content: center;
    gap:5%;
  }
  </style>
  