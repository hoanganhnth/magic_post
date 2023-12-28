<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content"></div>
      <statistics-trans-component></statistics-trans-component>
      <list-orders class="list"></list-orders>
    </div>
  </div>
</template>

<script>
import ListOrders from "./components/ListOrders.vue";
import NavBarEmployee from "./components/NavBarEmployee.vue";
import StatisticsTransComponent from "./components/StatisticsTransComponent.vue";
export default {
  name: "ConfirmOrders",
  components: {
    NavBarEmployee,
    StatisticsTransComponent,
    ListOrders,
  },
};
</script>
<style scoped>
.list {
  margin-left: 5%;
}
</style>
