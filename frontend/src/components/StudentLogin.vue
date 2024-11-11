<template>
    <div class="login-container">
      <h1>Student Login</h1>
      <p>Welcome to the student portal. Please log in using your credentials to access your grades and scores.</p>

      <form @submit.prevent="loginFn">
        <div class="form-group">
          <label for="matric-number">Matric Number</label>
          <input type="text" v-model="matno" id="matric-number" placeholder="Matric Number" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" v-model="password" id="password" placeholder="Password" />
        </div>
        <button type="submit" class="btn-login">Login</button>
      </form>
      <router-link to="/studentreg" class="register-link">Register</router-link>
    </div>
  </template>
  
  <script>
  import { ref, getCurrentInstance } from 'vue';
  import { studentAuth } from '@/composables/studentAuth.js';
  import { useRouter } from 'vue-router';
  
  export default {
    setup() {
      const { proxy } = getCurrentInstance();
      const url = proxy.url;
      const matno = ref("");
      const password = ref("");
      const {login} = studentAuth();
      const $router = useRouter();
  
      const loginFn = () => {
        console.log(url)
          fetch(url + '/student/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              matno: matno.value,
              password: password.value
            })
          })
          .then(response => {
              if (response.ok) {
                response.json().then(data => {
                login(data)
                console.log(data.message);
                console.log(data)
                $router.push('/studash');
                });
            } else {
              response.json().then(data => alert(data.message))
            }
      })
      .catch(error => {
        console.log('Error:', error);
      });
            
      }

      return{
        matno,
        password,
        loginFn
      }
    }

  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 80vw;
    margin: 0 auto;
    text-align: center;
  }
  
  h1 {
    color: #2c3e50;
    font-size: 24px;
  }
  
  p {
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
    display:flex;
    flex-direction: column;
    align-items:flex-start;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  
  .btn-login {
    background-color: hsl(257, 24%, 47%);
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    width: 100%;
    margin-top: 10px;
    cursor: pointer;
  }
  
  .register-link {
    display: block;
    margin-top: 15px;
    color: #6b5b95;
    text-decoration: none;
  }
  
  .register-link:hover {
    text-decoration: underline;
  }
  </style>
  