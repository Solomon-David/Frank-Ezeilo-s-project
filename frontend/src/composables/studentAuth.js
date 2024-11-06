import { ref } from 'vue';

export function studentAuth() {
  const student = ref(null);
  const isAuthenticated = ref(false);

  // Check local storage on initialization
  const savedStudent = localStorage.getItem('student');
  if (savedStudent) {
    student.value = JSON.parse(savedStudent);
    isAuthenticated.value = true;
  }

  // Login function
  const login = (studentData) => {
    student.value = studentData;
    isAuthenticated.value = true;
    localStorage.setItem('student', JSON.stringify(studentData));
  };

  // Logout function
  const logout = () => {
    student.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('student');
  };

  return {
    student,
    isAuthenticated,
    login,
    logout,
  };
}