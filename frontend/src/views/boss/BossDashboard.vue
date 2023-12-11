<template>
  <div class='dashboard'>
   <nap-bar-boss></nap-bar-boss>
    <div class='dashboard-app'>
      <div class='dashboard-content'>
       
  
      </div>
    </div>
  </div>
</template>
    
<script>
import NapBarBoss from '../../components/NapBarBoss.vue'
export default {
  components: { NapBarBoss },

  name: 'BossDashboard',
  data() {

    return {
      showForm: false,
      items : [
  {
    id:1,
    transaction:"Hà Nội",
    name: "John Doe",
    email: "johndoe@example.com",
    userRole: "admin",
    status: "active",
  },
  {
    id:2,
    transaction:"Đà Nẵng",
    name: "Jane Doe",
    email: "janedoe@example.com",
    userRole: "user",
    status: "inactive",
  },
],
      username : "",
      email:"",
      first_name:"",
      last_name :"",
      password:"",
      password_confirm:"",
     

    };
  },
   
  
};
</script>

   
<style scoped>



/* Add component-specific styles here */</style>
    