import { ref } from 'vue';

export function lecturerAuth() {
  const lecturer = ref(null);
  const isAuthenticated = ref(false);

  // Check local storage on initialization
  const savedLecturer = localStorage.getItem('lecturer');
  if (savedLecturer!="undefined") {
    console.log(savedLecturer)
    lecturer.value = JSON.parse(savedLecturer);
    isAuthenticated.value = true;
  }

  // Login function
  const login = (lecturerData) => {
    lecturer.value = lecturerData;
    isAuthenticated.value = true;
    localStorage.setItem('lecturer', JSON.stringify(lecturerData));
  };

  // Logout function
  const logout = () => {
    lecturer.value = null;
    isAuthenticated.value = false;
    localStorage.removeItem('lecturer');
  };

  const update = (updated) =>{
    lecturer.value=updated;
    localStorage.setItem('lecturer', JSON.stringify(updated));
  }

  return {
    lecturer,
    isAuthenticated,
    login,
    logout,
    update
  };
}