<template>
    <div class="profile-page">
      <header class="header">
        <h1>SRAS</h1>
      </header>
  
      <section class="profile-info">
        <h3>Lecturer Profile Information</h3>
        <p>(Tap field to edit)</p>
        
  
        <ProfileField v-for="value,key in profile"
        :key="key"
        type="lecturer"  
        :value="value"
          :field="key"
          @update="refresh"
        />
        <!-- <ProfileField
        type="lecturer"  
        :value="profile.matno"
          field="matno"
          @update="refresh"
        />
        <ProfileField
        type="lecturer"  
        :value="profile.department"
          field="department"
          @update="refresh"
        />
        <ProfileField
        type="lecturer"  
        :value="profile.level"
          field="level"
          @update="refresh"
        /> -->
      </section>
  
      
    </div>
  </template>
  
  <script>
  import ProfileField from './ProfileField.vue';
  import { lecturerAuth } from '@/composables/lecturerAuth';
  
  export default {
    name: 'ProfilePage',
    components: {
      ProfileField
    },
    data() {
      return {
        profile: lecturerAuth().lecturer
      };
    },
    methods: {
      refresh(event){
        console.log("the event is ", event);
        lecturerAuth().update(event);
        this.profile = lecturerAuth().lecturer
      },
      logOut() {
        lecturerAuth().logout()
        // Logic to log out and redirect to the login page
        console.log('Logging out...');
        this.$router.push('/lectlogin');
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
  