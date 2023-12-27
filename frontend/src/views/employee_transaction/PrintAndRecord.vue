<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <print-orders></print-orders>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarEmployee from "./components/NavBarEmployee.vue";
import PrintOrders from "./components/PrintOrders.vue";

export default {
  name: "CreatAccountCollection",
  components: {
    NavBarEmployee,
    PrintOrders,
  },
};
</script>
<style>
.dashboard-content {
  margin-left: 20px !important;
}
</style>
