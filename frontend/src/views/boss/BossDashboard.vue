<template>
  <div class='dashboard'>
   <nap-bar-boss></nap-bar-boss>
    <div class='dashboard-app'>
      <div class='dashboard-content'>
       <h3>Trang chủ</h3>
    <chart></chart>
      </div>
    </div>
  </div>
</template>
    
<script>
import NapBarBoss from '../../components/NapBarBoss.vue'
import Chart from './components/Chart.vue';
export default {
  components: { NapBarBoss, Chart },

  name: 'BossDashboard',
  data() {
    return {
    
    };
  },
};
</script>

   
<style scoped>


/* Add component-specific styles here */</style>
    