<template>
  <div class="lecturer-login">
    <h1>Lecturer Login</h1>
    
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="staffIdEmail">Staff ID </label>
        <input
          v-model="staffId"
          type="text"
          id="staffIdEmail"
          placeholder="Enter your staff ID"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-wrapper">
          <input
            v-model="password"
            :type="passwordVisible ? 'text' : 'password'"
            id="password" 
            placeholder="Enter your password"
          />
          <font-awesome-icon
            :icon="passwordVisible ? 'eye-slash' : 'eye'"
            class="toggle-visibility"
            @click="togglePasswordVisibility"
          />
        </div>
      </div>

      <button type="submit" class="login-button">Login</button>
    </form>

    <p class="register-link" @click="goToRegister">Register</p>
  </div>
</template>

<script>
import { lecturerAuth } from '@/composables/lecturerAuth';
import { ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'LecturerLogin',
  setup() {
    const router = useRouter();
    const staffId = ref('');
    const password = ref('');
    const passwordVisible = ref(false);
    const { proxy } = getCurrentInstance();
    const url = proxy.url;
    const {login} = lecturerAuth()
    const $router = useRouter();

    const togglePasswordVisibility = () => {
      passwordVisible.value = !passwordVisible.value;
    };

    const handleLogin = () => {
      // Logic for handling login, e.g., API call
      fetch(url + '/lecturer/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              staffId:staffId.value,
              password: password.value
            })
          })
          .then(response => {
              if (response.ok) {
                response.json().then(data => {
                login(data)
                console.log(data.message);
                console.log(data)
                $router.push('/lectdash');
                });
            } else {
              response.json().then(data => alert(data.message))
            }
      })
      .catch(error => {
        console.log('Error:', error);
      });
    };

    const goToRegister = () => {
      router.push('/lectreg');
    };

    return {
      staffId,
      password,
      passwordVisible,
      togglePasswordVisibility,
      handleLogin,
      goToRegister,
    };
  },
};
</script>

<style scoped>
.lecturer-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #1b1b43;
}

form{
  width: 90%;  
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
}

.form-group {
  width: 100%;
  margin-bottom: 20px;
}

label {
  text-align: left;
  margin-left: 5%;
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background-color: #f3f3f7;
}

.password-wrapper {
  display: flex;
  align-items: center;
  position: relative;
}

.toggle-visibility {
  cursor: pointer;
  margin-left: 10px;
  color: #6c5ce7;
  position:absolute;
  right:5%;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
}

.register-link {
  margin-top: 15px;
  color: #1b1b43;
  cursor: pointer;
  font-weight: bold;
}
</style>
