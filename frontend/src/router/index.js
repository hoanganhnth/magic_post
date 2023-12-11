// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/HomePage';
import FormLogin from '@/views/FormLogin';
import FormRegister from '@/views/FormRegister';
import Contact from '@/views/Contact.vue';
import Introduction from '@/views/Introduction';
import EmployeeForm from '@/views/boss/EmployeeForm'
import ListEmployee from '@/views/boss/ListEmployee'
import TransactionPoints from '@/views/boss/TransactionPoints'
import CollectionPoints from'@/views/boss/CollectionPoints'
import BossDashboard from '@/views/boss/BossDashboard';
import CreateAccount from '@/views/leader_transaction/CreateAccount'
import OrderStatistics from '@/views/leader_transaction/OrderStatistics'




const routes = [
  { path: '/contact', name: 'contact', component: Contact },
  { path: '/home', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: FormLogin },
  { path: '/register', name: 'register', component: FormRegister },
  { path: '/', component: HomePage },
 
  { path: '/introduct', name: 'introduct', component: Introduction },

  { path: '/boss', component: BossDashboard },

  { path: '/user/:id', component: EmployeeForm },
  { path: '/user/add', component: EmployeeForm },
  { path: '/users', component: ListEmployee  },
{ path: '/collection', component: CollectionPoints  },
{ path: '/transaction', component: TransactionPoints  },
{ path: '/leader/account', component: CreateAccount  },
{ path: '/leader/order', component: OrderStatistics  },



  // Thêm các routes khác nếu cần
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
