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
          <select v-model="selectedDepartment" id="filter">
            <option v-for="filter in filters" :key="filter" :value="filter">
              {{ filter }}
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
          <tr v-for="student in filteredStudents" :key="student.matricNumber">
            <td>{{ student.fullName }}</td>
            <td>{{ student.matricNumber }}</td>
            <td>{{ student.department }}</td>
            <td>
              <font-awesome-icon 
                icon="trash" 
                @click="deleteStudent(student.matricNumber)" 
                class="delete-icon"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    
    setup() {
      // Sample data for students
      const students = ref([
        { fullName: "Franklin Ezeilo", matricNumber: "DE.2019/1234", department: "Computer Engineering" },
        { fullName: "Franklin Ezeilo", matricNumber: "DE.2019/1235", department: "Computer Engineering" },
        { fullName: "Franklin Ezeilo", matricNumber: "DE.2019/1236", department: "Computer Engineering" },
        { fullName: "Franklin Ezeilo", matricNumber: "DE.2019/1237", department: "Computer Engineering" }
      ]);
  
      const searchQuery = ref('');
      const selectedDepartment = ref('');
      const filters = ref(["Department","Name", "Matric Number"]);
  
      const filteredStudents = computed(() => {
        return students.value.filter(student => {
          const matchesSearch = student.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                                student.matricNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                                student.department.toLowerCase().includes(searchQuery.value.toLowerCase());
          return matchesSearch;
        });
      });
  
      const deleteStudent = (matricNumber) => {
        students.value = students.value.filter(student => student.matricNumber !== matricNumber);
      };
  
      return {
        students,
        searchQuery,
        selectedDepartment,
        filters,
        filteredStudents,
        deleteStudent
      };
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
  