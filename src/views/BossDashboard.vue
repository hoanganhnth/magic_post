<template>
    <page-header></page-header>
    
      <div>
        <h2>Quản lý</h2>
        <ul>
        <li >
            <transaction-points></transaction-points>
            <collection-points></collection-points>
        </li>
      </ul>
      </div>
    </template>
    
    <script>
  import PageHeader from '@/components/PageHeader.vue';
import TransactionPoints from '../components/TransactionPoints.vue';
import CollectionPoints from '@/components/CollectionPoints.vue';
  
    export default {
    components: { PageHeader, TransactionPoints, CollectionPoints},
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
    