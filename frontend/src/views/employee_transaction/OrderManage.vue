<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <v-col>
          <order-details></order-details>
          <creat-orders id="creat"></creat-orders>
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>
import CreatOrders from "./components/CreatOrders.vue";
import NavBarEmployee from "./components/NavBarEmployee.vue";
import OrderDetails from "./components/OrderDetails.vue";

export default {
  name: "CreatAccountCollection",
  components: {
    NavBarEmployee,
    OrderDetails,
    CreatOrders,
  },
};
</script>
<style scoped>
#creat {
  margin-top: 20px;
}
</style>
