<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <order-to-collections></order-to-collections>
      </div>
    </div>
  </div>
</template>

<script>
import NavBarEmployee from "./components/NavBarEmployee.vue";
import OrderToCollections from "./components/OrderToCollections.vue";
export default {
  name: "ConfirmOrders",
  components: {
    NavBarEmployee,
    OrderToCollections,
  },
};
</script>
<style scoped></style>
