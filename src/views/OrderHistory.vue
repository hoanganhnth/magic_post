<template>
  <page-header></page-header>
  
    <div>
      <h2>Order History</h2>
      <ul>
      <li v-for="history in historys" :key="history.id">{{"Ten:"+ history.name +"-Tuoi: "+ history.age  }}</li>
    </ul>
    </div>
  </template>
  
  <script>
import PageHeader from '@/components/PageHeader.vue';

  export default {
  components: { PageHeader},
    name: 'OrderHistory',
    data() {
    return {
      historys: [
        { id: 1, name: 'Nguyen Van A', age: 19 },
        { id: 2, name: 'a bc', age: 20 },
        { id: 3, name: 'People a', age: 21 },
        { id: 4, name: 'Human', age: 22 },
        // Thêm các sản phẩm khác tại đây
      ]
    };
  }
    // Add component logic here if needed
  }
  </script>
 
  <style scoped>
 

  li {
    margin: 10px;
      border: 1px solid #361d1d;
      padding: 10px;
      text-align: center;
  }
  /* Add component-specific styles here */
  </style>
  