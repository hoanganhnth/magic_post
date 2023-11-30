// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import UpdateEmployee from '@/views/UpdateEmployee.vue';
import HomePage from '@/views/HomePage';
import FormLogin from '@/views/FormLogin';
import FormRegister from '@/views/FormRegister';
import BossDashboard from '@/views/BossDashboard';
import Contact from '@/views/Contact.vue';




const routes = [
  { path: '/list', component: UpdateEmployee },
  { path: '/contact', component: Contact },
  { path: '/home', component: HomePage },
  { path: '/login', component: FormLogin },
  { path: '/register', component: FormRegister },
  { path: '/', component: HomePage },
  { path: '/boss', component: BossDashboard },




  // Thêm các routes khác nếu cần
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
