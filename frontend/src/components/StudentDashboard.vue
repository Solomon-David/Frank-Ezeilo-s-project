<template>
    <div class="student-dashboard">
      <header class="header">
        <h1>Student Dashboard</h1>
        
      </header>
  
      <section class="academic-session">
        <h2>Select Academic Session</h2>
        <div class="dropdown-group">
          <label for="session">Select Academic Session</label>
          <select id="session" v-model="selectedSession">
            <option v-for="session in sessions" :key="session" :value="session">{{ session }}</option>
          </select>
  
          <label for="semester">Select Semester</label>
          <select id="semester" v-model="selectedSemester">
            <option v-for="semester in semesters" :key="semester" :value="semester">{{ semester }}</option>
          </select>
        </div>
  
        <button class="search-button" @click="search">Search</button>
      </section>
  
      <section class="quick-links">
        <h2>Quick Links</h2>
        <div class="links">
          <div class="quick-link" @click="navigateTo('/mycourses')">
            <font-awesome-icon icon="book" class="icon" />
            <span class="title">Courses</span>
            <button class="go-button" >Go</button>
          </div>
  
          <div class="quick-link" @click="navigateTo('/myprofile')">
            <font-awesome-icon icon="user" class="icon" />
            <span class="title">Profile</span>
            <button class="go-button" >Go</button>
          </div>
  
          <div class="quick-link">
            <font-awesome-icon icon="sign-out-alt" class="icon" />
            <span class="title">Logout</span>
            <button @click="logout" class="go-button" >Go</button>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'StudentDashboard',
    data() {
      return {
        selectedSession: '2022/2023',
        selectedSemester: 'Semester 1',
        sessions: ['2022/2023', '2021/2022', '2020/2021'], // example data
        semesters: ['Semester 1', 'Semester 2'], // example data
      };
    },
    methods: {
      search() {
        console.log('Searching with session:', this.selectedSession, 'and semester:', this.selectedSemester);
        // Implement search logic here
      },
      navigateTo(route) {
        this.$router.push(route);
      },
      logout(){
        console.log("logged out")
      }
 
    }
  };
  </script>
  <style scoped>
  .student-dashboard {
    padding: 20px;
    text-align: center;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .header h1 {
    color: #1a1a86;
    font-size: 24px;
    width:100%;
  }
  
  .academic-session h2,
  .quick-links h2 {
    color: #1a1a86;
    font-size: 18px;
    margin: 20px 0;
  }

  .quick-links h2{
    text-align:left;
  }
  
  .dropdown-group {
    margin: 15px 0;
  }
  
  .dropdown-group label {
    display: block;
    margin: 10px 0 5px;
    color: #4a4a4a;
    text-align:left;
  }
  
  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    background-color: #e0e0e0;
    border: none;
    border-radius: 5px;
  }
  
  .search-button {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    background-color: #7962f2;
    color: white;
    border: none;
    border-radius: 10px;
  }
  
  .quick-links {
    margin-top: 30px;
  }
  
  .links {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .quick-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f8f8f8;
    padding: 10px;
    margin: 10px 0;
    width: 100%;
    max-width: 400px;
    border-radius: 10px;
    cursor: pointer;
  }
  
  .icon {
    font-size: 24px;
    margin-right: 10px;
  }
  
  .title {
    flex: 1;
    text-align: left;
    font-size: 16px;
  }
  
  .go-button {
    background-color: #e0e0e0;
    color: #4a4a4a;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .notification-icon {
    font-size: 18px;
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  