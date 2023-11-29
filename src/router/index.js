// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import UpdateEmployee from '@/views/UpdateEmployee.vue';
import ShoppingCart from '@/views/ShoppingCart.vue';
import OrderHistory from '@/views/OrderHistory';
import HomePage from '@/views/HomePage';
import FormLogin from '@/views/FormLogin';
import FormRegister from '@/views/FormRegister';

import TransactionPoints from'@/views/TransactionPoints'
import CollectionPoints from'@/components/CollectionPoints'


const routes = [
  { path: '/list', component: UpdateEmployee },
  { path: '/cart', component: ShoppingCart },
  { path: '/order', component: OrderHistory },
  { path: '/home', component: HomePage },
  { path: '/login', component: FormLogin },
  { path: '/register', component: FormRegister },
  { path: '/', component: HomePage },
  {
    path: '/collection-points',
    name: 'CollectionPoints',
    component: CollectionPoints,
  },

  {
    path: '/transaction-points',
    name: 'TransactionPoints',
    component: TransactionPoints,
  },


  // Thêm các routes khác nếu cần
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
