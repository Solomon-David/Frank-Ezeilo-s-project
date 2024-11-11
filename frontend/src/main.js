// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index.js'; // Import the router

// Import FontAwesome core and Vue component
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import specific icons
import { faEdit,faAngleRight, faSearch, faEye, faEyeSlash, faCog, faTrash, faUsers, faBook, faChartBar, faFileAlt, faUser, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faEdit, faAngleRight, faSearch, faEye, faEyeSlash, faCog, faTrash, faUsers, faBook, faChartBar, faFileAlt, faUser, faSignOutAlt );

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.config.globalProperties.url = '/api';
app.use(router); // Use the router
app.mount('#app');