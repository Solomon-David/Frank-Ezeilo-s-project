<template>
    <div class="profile-page">
      <header class="header">
        <h1>SRAS</h1>
      </header>
  
      <section class="profile-info">
        <h3>Lecturer Profile Information</h3>
        <p>(Tap field to edit)</p>
  
        <ProfileField
          :value="profile.name"
          @update:value="profile.name = $event"
        />
        <ProfileField
          :value="profile.id"
          @update:value="profile.id = $event"
        />
        <ProfileField
          :value="profile.department"
          @update:value="profile.department = $event"
        />
      </section>
  
      
    </div>
  </template>
  
  <script>
  import ProfileField from './ProfileField.vue';
  
  export default {
    name: 'ProfilePage',
    components: {
      ProfileField
    },
    data() {
      return {
        profile: {
          name: 'Emily Johnson',
          id: 'CEG01022023',
          department: 'Computer Engineering'
        }
      };
    },
    methods: {
      logOut() {
        // Logic to log out and redirect to the login page
        console.log('Logging out...');
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  .profile-page {
    text-align: center;
    padding: 20px;
  }
  
  .header h1 {
    color: #1a1a86;
    font-size: 24px;
    margin-bottom: 5px;
  }
  
  .header h2 {
    font-size: 18px;
    color: #4a4a4a;
    font-weight: normal;
    margin-bottom: 20px;
  }
  
  .profile-info {
    margin-top: 20px;
  }
  
  .profile-info h3 {
    font-size: 20px;
    color: #1a1a86;
    margin: 10px 0;
  }
  
  </style>
  