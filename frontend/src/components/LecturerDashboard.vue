<template>
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Lecturer Dashboard</h1>
        <div class="settings-icon">
            <font-awesome-icon :icon="cog" />
        </div>
      </header>
  
      <section class="welcome-message">
        <p>Welcome, Dr. Emily Smith (Staff ID: 123456)</p>
      </section>
      
      <section class="task-list">
        <h2>Manage your tasks</h2>
        <ul>
          
    <li @click="navigateTo('/students')">
      <font-awesome-icon icon="users" /> 
      <span>Students</span>
      <font-awesone-icon :icon="['fas', 'angle-right']"/>
    </li>
    <li @click="navigateTo('/courses')">
      <font-awesome-icon icon="book" /> 
      <span>Courses</span>
      <font-awesone-icon :icon="['fas', 'angle-right']"/>
    </li>
    <li @click="navigateTo('/reports')">
      <font-awesome-icon icon="chart-bar" /> 
      <span>Reports</span>
      <font-awesone-icon :icon="['fas', 'angle-right']"/>
    </li>
    <li @click="navigateTo('/assessments')">
      <font-awesome-icon icon="file-alt" /> 
      <span>Assessments</span>
      <font-awesone-icon :icon="['fas', 'angle-right']"/>
    </li>
    <li @click="navigateTo('/lecturerprofile')">
      <font-awesome-icon icon="user" /> 
      <span>Profile</span>
      <font-awesone-icon :icon="['fas', 'angle-right']"/>
    </li>
    <li @click="logout">
      <font-awesome-icon icon="sign-out-alt"/> 
      <span>Log Out</span>
      <font-awesone-icon :icon="['fas', 'angle-right']"/>
    </li>
  </ul>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(page) {
        this.$router.push({ path: page });
      },
      logout() {
        // Logic to handle logout
        console.log("Logging out...");
        this.$router.push({ name: 'login' });
      },
    },
  };
  </script>
  
  <style scoped>
  .dashboard-container {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
  }
  
  .dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  h1 {
    font-size: 24px;
    color: #2c3e50;
  }
  
  .settings-icon {
    font-size: 20px;
    color: #2c3e50;
  }
  
  .welcome-message {
    margin: 20px 0;
    color: #34495e;
  }
  
  .task-list {
    text-align: left;
  }
  
  .task-list h2 {
    margin-bottom: 10px;
  }
  
  .task-list ul {
    list-style: none;
    padding: 0;
  }
  
  .task-list li {
    display: flex;
    gap:10%;
    align-items: center;
    padding: 10px;
    margin: 5px 0;
    background-color: #f5f5f5;
    border-radius: 5px;
    cursor: pointer;
  }
  
  /* .task-list li span{
     margin-left: 10%;
   }
   */
  
  .task-list li:hover {
    background-color: #e0e0e0;
  }
  
  </style>
  