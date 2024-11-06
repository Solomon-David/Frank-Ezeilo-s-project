<template>
    <div class="student-registration">
      <h2>Student Registration</h2>
      <p>Please sign up using your academic credentials to access your grade and scores.</p>
      
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="fullname">Full Name</label>
          <input type="text" id="fullname" v-model="fullname" placeholder="Last name first" required />
        </div>
  
        <div class="form-group">
          <label for="matricNumber">Matric Number</label>
          <input type="text" id="matricNumber" v-model="matricNumber" placeholder="Matric Number" required />
        </div>
  
        <div class="form-group">
          <label for="department">Department</label>
          <input type="text" id="department" v-model="department" placeholder="Department" required />
        </div>
  
        <div class="form-group">
          <label for="level">level</label>
          <select id="level" v-model="level" required>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </select>
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" placeholder="Password" required />
          <span class="password-toggle" @click="togglePasswordVisibility">
            <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
          </span>
        </div>
  
        <button type="submit" class="register-button">Register</button>
      </form>
  
      <p class="login-link" @click="goToLogin">Login</p>
    </div>
  </template>
  
  <script>
    
    import { studentAuth } from '../composables/studentAuth';
  export default {

    data() {
      return {
        fullname: '',
        matricNumber: '',
        department: '',
        password: '',
        level: '',
        passwordVisible: false,
        login: studentAuth().login
      };
    },
    methods: {
        register() {
      fetch(this.url + '/student/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullname: this.fullname,
          matricNumber: this.matricNumber,
          department: this.department,
          level: this.level,
          password: this.password
        })
      })
      .then(response => {
          if (response.ok) {
            response.json().then(data => {
            this.login(data)
            console.log(data.message);
            console.log(data)
            this.$router.push('/studash');
            });
        } else {
          response.json().then(data => alert(data.message))
        }
  })
  .catch(error => {
    console.log('Error:', error);
  });

      },
      togglePasswordVisibility() {
        this.passwordVisible = !this.passwordVisible;
        const passwordInput = document.getElementById('password');
        passwordInput.type = this.passwordVisible ? 'text' : 'password';
      },
      goToLogin() {
        this.$router.push('/studentlogin');
      }
    }
  };
  </script>
  
  <style scoped>
  .student-registration {
    text-align: center;
    padding: 20px;
  }
  
  h2 {
    color: #1a1a86;
    font-size: 24px;
  }
  
  p {
    color: #4a4a4a;
    font-size: 14px;
  }
  
  .form-group {
    margin-bottom: 20px;
    display:flex;
    flex-direction: column;
    align-items:flex-start;
  }
  
  label {
    display: block;
    font-size: 16px;
    color: #05050a;
    margin-bottom: 5px;
  }
  
  input,select {
    width: 95%;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #e0e0e0;
    font-size: 16px;
    background-color: #f3f3f3;
  }
  
  input::placeholder {
    color: #bfbfbf;
  }
  
  .password-toggle {
    position: relative;
    float: right;
    margin-top: -30px;
    margin-right: 10px;
    cursor: pointer;
  }
  
  .register-button {
    margin-top:10%;
    width: 100%;
    padding: 10px;
    background-color: #7962f2;
    color: white;
    font-size: 18px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }
  
  .login-link {
    color: #1a1a86;
    font-size: 16px;
    margin-top: 20px;
    cursor: pointer;
  }
  </style>
  