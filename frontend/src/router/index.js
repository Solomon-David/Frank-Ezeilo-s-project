// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LecturerLogin from '@/components/LecturerLogin.vue';
import StudentLogin from '@/components/StudentLogin.vue';
import LecturerRegistration from "@/components/LecturerRegistration";
import StudentRegistration from "@/components/StudentRegistration";
import SRASLandingPage from '@/components/SRASLandingPage.vue'; // Ensure you import the landing page component
import LecturerDashboard from '@/components/LecturerDashboard.vue';
import StudentDirectory  from '@/components/StudentDirectory.vue';
import CourseDirectory from '@/components/CourseDirectory.vue';
import StudentAssessment from '@/components/StudentAssessment.vue';
import StudentReports from '@/components/StudentReports.vue';
import LecturerProfile from '@/components/LecturerProfile.vue';

import StudentDashboard from '@/components/StudentDashboard.vue';
import StudentCourses from '@/components/StudentCourses.vue';
import StudentProfile from '@/components/StudentProfile.vue';


const routes = [
    {
        path: '/lectdash',
        name: "LecturerDashboard",
        component: LecturerDashboard
    },
  {
    path: '/lectlogin',
    name: 'LecturerLogin',
    component: LecturerLogin
  },
  {
    path: '/',
    name: 'LandingPage',
    component: SRASLandingPage
  },
  {
    path: '/lectreg',
    name: "LecturerRegistration",
    component: LecturerRegistration
  },
  
  {
    path: '/students',
    name: 'StudentDirectory',
    component: StudentDirectory
  },
{
    path: '/courses',
    name: 'CourseDirectory',
    component: CourseDirectory
},
{
    path: '/assessments',
    name: 'StudentAssessment',
    component: StudentAssessment
},
{
    path: '/reports',
    name: 'StudentReports',
    component: StudentReports
},
 {
    path: '/lecturerprofile',
    name: 'LecturerProfile',
    component: LecturerProfile
},
//These are student routes
{
  path: '/studentreg',
  name: "StudentRegistration",
  component: StudentRegistration
},
{
  path: '/studentlogin',
  name: 'StudentLogin',
  component: StudentLogin
},
{
    path: '/studash',
    name: 'StudentDashboard',
    component: StudentDashboard
},
{
    path: '/mycourses',
    name: 'StudentCourses',
    component: StudentCourses
},
 {
  path:'/myprofile',
  name: 'StudentProfile',
  component:  StudentProfile
 }

];

const router = createRouter({
  history: createWebHistory(), // Use createWebHistory for history mode
  routes
});

export default router;