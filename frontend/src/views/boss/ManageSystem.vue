
<template>
    <div class='dashboard'>
     <nap-bar-boss></nap-bar-boss>
      <div class='dashboard-app'>
        <div class='dashboard-content'>
            <manage-components></manage-components>
          
    
        </div>
      </div>
    </div>
  </template>
 
  
  <script>
import NapBarBoss from '../../components/NapBarBoss.vue';
import ManageComponents from './components/ManageComponents.vue';
  export default {
  components: { NapBarBoss, ManageComponents },
    name: "ManageSystem",
    data() {
    return {
      
    };
  },
  methods: {
    
  },
};
</script>