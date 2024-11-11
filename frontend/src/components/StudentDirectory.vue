<template>
    <div class="student-directory">
      <h2>Student Directory</h2>
      
      
      <div class="search-filter">
        <div class="search-box">
        <font-awesome-icon class="search-icon" :icon="['fas','search']" />
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search by name or matric number..." 
          class="search-input"
        />
      </div>
  
        <div class="filter-dropdown">
          <label for="filter">Filter by:</label>
          <select v-model="field" id="filter" @change="search">
            <option v-for="filter, key in filters" :key="key" :value="filter">
              {{ key }}
            </option>
          </select>
        </div>
      </div>
  
     <h1>Table of Students</h1>
     
      <table class="student-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Matric Number</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="student in students" :key="student.matno">
            <td>{{ student.fullname }}</td>
            <td>{{ student.matno }}</td>
            <td>{{ student.department }}</td>
            <td>
              <font-awesome-icon 
                icon="trash" 
                @click="deleteStudent(student.matno)" 
                class="delete-icon"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, getCurrentInstance } from 'vue';
  import { lecturerAuth } from '@/composables/lecturerAuth';
  export default {
    
    setup() {
      // Sample data for students
      const students = ref([]);
      
      const searchQuery = ref('');
      const field = ref('');
      // const filters = ref(["Department","Name", "Matric Number"]);
      const filters = ref({"Department":"department", "Name":"fullname", "Matric Number":"matno"});
      const profile = lecturerAuth().lecturer;
      const {proxy} = getCurrentInstance();
      const url = proxy.url;

      const loadStudents = () =>{
        console.log(url)
        console.log(profile.value)

        fetch(`${url}/student/students?field=department&value=${encodeURIComponent(profile.value.department)}`)
      .then(res => res.json())
      .then(res =>{
        console.log(res)
        students.value = res.result;
      })
      }
  
      const search = async () => {
        
          let query = await fetch(`${url}/student/students?field=${encodeURIComponent(field.value)}&value=${encodeURIComponent(searchQuery.value)}`);
          query = await query.json();
          
       
          students.value = query.result;

        };
      
  
      const deleteStudent = async (matricNumber) => {
        let query = await fetch(`${url}/student/delete/${encodeURIComponent(matricNumber)}`, {method:"DELETE"});
        let response = await query.text();
        alert(response);
        loadStudents();

      };
  
      return {
        students,
        loadStudents,
        searchQuery,
        search,
        field,
        filters,
        profile,
        deleteStudent
      };
    },
    mounted(){
      this.loadStudents();
    }
  };
  </script>
  
  <style scoped>
  .student-directory {
    max-width: 600px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  h1, h2 {
    color: #2c3e50;
  }

  h1{
    text-align:left;
  }
  
  h2{
    text-align:center;
  }

  .search-box{
    position: relative;
  }

.search-icon{
  color:grey;
  position: absolute;
  left:5%;
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

  .search-filter input, .search-filter select{
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
  
  .student-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  .student-table th, .student-table td {
    padding: 0.75rem;
    border: none;
    text-align: left;
  }
  
  .student-table th {
    font-weight: bold;
    color: #2c3e50;
    font-size:0.9em;
  }
  
  .delete-icon {
    color: #ff4d4f;
    cursor: pointer;
  }
  
  .delete-icon:hover {
    color: #ff1a1a;
  }
  </style>
  