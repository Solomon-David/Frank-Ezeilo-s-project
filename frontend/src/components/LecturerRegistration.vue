<template>
  <div class="lecturer-registration">
    <h1>Lecturer Registration</h1>
    
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="full-name">Full Name</label>
        <input type="text" v-model="fullName" id="full-name" placeholder="Last name first" />
      </div>

      <div class="form-row">
        <div class="form-group half-width">
          <label for="staff-id">Staff ID</label>
          <input type="text" v-model="staffId" id="staff-id" placeholder="Staff ID" />
        </div>
        <div class="form-group half-width">
          <label for="email">Email</label>
          <input type="email" v-model="email" id="email" placeholder="Email" />
        </div>
      </div>

      <div class="form-group">
        <label for="department">Department</label>
        <input type="text" v-model="department" id="department" placeholder="Department" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <div class="password-wrapper">
          <input :type="passwordVisible ? 'text' : 'password'" v-model="password" id="password" placeholder="Password" />
          <font-awesome-icon
            :icon="passwordVisible ? 'eye-slash' : 'eye'"
            class="toggle-visibility"
            @click="togglePasswordVisibility"
          />
        </div>
      </div>

      <button type="submit" class="register-button">Register</button>
    </form>

    <router-link to="/lectlogin" class="login-link">Login</router-link>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
 
export default {
  name: 'LecturerRegistration',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      fullName: '',
      staffId: '',
      email: '',
      department: '',
      password: '',
      passwordVisible: false
    };
  },
  methods: {
    register() {
      // Implement registration logic here
      console.log("Registering:", this.fullName, this.staffId, this.email, this.department, this.password);
    },
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
  },
};
</script>

<style scoped>
.lecturer-registration {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: #1b1b43;
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

.form-row {
  display: flex;
  gap: 20px;
}

.half-width {
  flex: 1;
}

.form-group.half-width > input {
    width: 90%;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  margin-left: 5%;
  text-align: left;
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
  position:relative;
}


.toggle-visibility {
  cursor: pointer;
  margin-left: 10px;
  color: #6c5ce7;
  position:absolute;
  right:5%;
}
.register-button {
  width: 100%;
  padding: 10px;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
}

.login-link {
  margin-top: 15px;
  color: #1b1b43;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
}

.login-link:hover {
  text-decoration: underline;
}
</style>
