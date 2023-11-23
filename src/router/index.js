// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '@/views/ProductList.vue';
import ShoppingCart from '@/views/ShoppingCart.vue';
import OrderHistory from '@/views/OrderHistory';
import HomePage from '@/views/HomePage';
import FormLogin from '@/views/FormLogin';
import FormRegister from '@/views/FormRegister';


const routes = [
  { path: '/list', component: ProductList },
  { path: '/cart', component: ShoppingCart },
  { path: '/order', component: OrderHistory },
  { path: '/home', component: HomePage },
  { path: '/login', component: FormLogin },
  { path: '/register', component: FormRegister },
  { path: '/', component: HomePage },



  // Thêm các routes khác nếu cần
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
