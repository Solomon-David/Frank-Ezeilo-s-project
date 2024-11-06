<template>
  <div class="sras-landing-page">
    <header class="header">
      <h1>SRAS</h1>
      <h2>Student Reporting and Assessment System</h2>
    </header>

    <div class="login-buttons">
      <button @click="goToLecturerLogin" class="lecturer-login">Lecturer Login</button>
      <button @click="goToStudentLogin" class="student-login">Student Login</button>
    </div>

    <div class="hero-section">
      <img :src="bookStackImage" alt="Stack of books" class="hero-image" />
      <div class="hero-text">
        <h3>Streamline your assessments and generate comprehensive reports</h3>
        <p>
          Our Student Assessment and Reporting System is designed to simplify the
          process of managing student assessments and generating detailed reports...
        </p>
      </div>
    </div>

    <!-- Conditional rendering for custom modal -->
    <div v-if="isDialogVisible" class="custom-dialog-overlay">
      <div class="custom-dialog">
        <router-view></router-view>
        <button @click="closeDialog" class="close-dialog">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import bookStackImage from '@/assets/book-stack.png';

export default {
  name: 'SRASLandingPage',
  setup() {
    const router = useRouter();
    const isDialogVisible = ref(false);

    function goToLecturerLogin() {
      isDialogVisible.value = true;
      router.push('/lectlogin');
    }

    function goToStudentLogin() {
      isDialogVisible.value = true;
      router.push('/studentlogin');
    }

    function closeDialog() {
      isDialogVisible.value = false;
    }

    return {
      bookStackImage,
      isDialogVisible,
      goToLecturerLogin,
      goToStudentLogin,
      closeDialog,
    };
  },
};
</script>


<style scoped>
.sras-landing-page {
  text-align: center;
  padding: 20px;
}

.header h1 {
  color: #1a1a86;
  font-size: 24px;
}

.header h2 {
  color: black;
  font-size: 16px;
  font-weight: normal;
}

.login-buttons {
  margin: 20px 0;
}

.lecturer-login,
.student-login {
  width: 80%;
  padding: 10px;
  font-size: 18px;
  border-radius: 10px;
  margin-bottom: 15px;
}

.lecturer-login {
  background-color: #7962f2;
  color: white;
  border: none;
}

.student-login {
  background-color: #e0e0e0;
  color: #4a4a4a;
  border: none;
}

.hero-section {
  margin: 20px 0;
}

.hero-image {
  max-width: 30rem;
  margin-bottom: 20px;
}

.hero-text h3 {
  color: #1a1a86;
  font-size: 20px;
  font-weight: bold;
}

.hero-text p {
  color: #4a4a4a;
  font-size: 14px;
}

/* Custom modal styling */
.custom-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.custom-dialog {
  background: white;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  text-align: center;
}

.close-dialog {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>
