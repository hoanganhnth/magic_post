// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage';
import FormLogin from '@/views/FormLogin';
import FormRegister from '@/views/FormRegister';
import Contact from '@/views/Contact.vue';
import Introduction from '@/views/Introduction';

import ManageEmployee from '@/views/boss/ManageEmployee';
import BossDashboard from '@/views/boss/BossDashboard';
import CreateAccount from '@/views/leader_transaction/CreateAccount'
import OrderStatistics from '@/views/leader_transaction/OrderStatistics'
import ManageSystem from '@/views/boss/ManageSystem'
import Statistical from '@/views/boss/Statistical'




const routes = [
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/home', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: FormLogin },
  { path: '/register', name: 'register', component: FormRegister },
  { path: '/', component: HomePage },
 
  { path: '/introduct', name: 'introduct', component: Introduction },

  { path: '/boss', component: BossDashboard },

{ path: '/boss/employee', component: ManageEmployee  },
{ path: '/boss/manage_collection', component: ManageSystem  },
{ path: '/boss/statistical', component: Statistical },
{ path: '/leader/account', component: CreateAccount  },
{ path: '/leader/order', component: OrderStatistics  },



  // Thêm các routes khác nếu cần
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
