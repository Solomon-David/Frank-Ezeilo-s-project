<template>
    <div class="course-directory">
      <h2>Course Directory</h2>
      
      <div class="search-filter">
        <div class="search-box">
          <font-awesome-icon class="search-icon" :icon="['fas','search']" />
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search by course title or code..." 
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
  
  
      <h1>Table of Courses</h1>
      
      <table class="course-table">
        <thead>
          <tr>
            <th>Course Title</th>
            <th>Course Code</th>
            <th>Units</th>
            <th>Department</th>
            
          </tr>
        </thead>
        <tbody>
          <tr v-for="course in filteredCourses" :key="course.courseCode">
            <td>{{ course.title }}</td>
            <td>{{ course.courseCode }}</td>
            <td>{{ course.units }}</td>
            <td>{{ course.department }}</td>
            <td>
              <font-awesome-icon 
                icon="edit" 
                @click="editCourse(course.courseCode)" 
                class="edit-icon"
              />
              <font-awesome-icon 
                icon="trash" 
                @click="deleteCourse(course.courseCode)" 
                class="delete-icon"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <button class="add-course-btn" @click="addCourse">Add New Course</button>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  
  export default {
    setup() {
      // Sample data for courses
      const courses = ref([
        { title: "Introduction to Programming", courseCode: "CS101", units: 3, department: "Computer Science" },
        { title: "Data Structures", courseCode: "CS102", units: 3, department: "Computer Science" },
        { title: "Calculus", courseCode: "MATH101", units: 4, department: "Mathematics" },
        { title: "Physics", courseCode: "PHYS101", units: 3, department: "Physics" }
      ]);
  
      const searchQuery = ref('');
      const selectedDepartment = ref('');
      const filters = ref(["Department", "Course Title", "Unit", "Course Code"]);
  
      const filteredCourses = computed(() => {
        return courses.value.filter(course => {
          const matchesSearch = course.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                                course.courseCode.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                                course.department.toLowerCase().includes(searchQuery.value.toLowerCase());
          return matchesSearch;
        });
      });
  
      const deleteCourse = (courseCode) => {
        courses.value = courses.value.filter(course => course.courseCode !== courseCode);
      };
  
      const addCourse = () => {
        // Implement logic to add a new course
        console.log("Add new course");
      };
  
      const editCourse = (courseCode) => {
        // Implement logic to edit a course
        console.log("Edit course:", courseCode);
      };
  
      return {
        courses,
        searchQuery,
        selectedDepartment,
        filters,
        filteredCourses,
        deleteCourse,
        addCourse,
        editCourse
      };
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
  
  .course-table th, .course-table td {
    padding: 0.25rem;
    border: none;
    text-align: left;
  }

  .course-table td:last-child{
    display:flex;
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
  </style>
  