<template>
   <nap-bar-boss></nap-bar-boss>
    
      <div>
        <h2>Quản lý</h2>
        <ul>
        <li >
            abc
        </li>
      </ul>
      </div>
    </template>
    
    <script>

import NapBarBoss from '@/components/NapBarBoss.vue';
  
    export default {
    components: { NapBarBoss},
      name: 'BossDashboard',
      data() {
      return {
       
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
    