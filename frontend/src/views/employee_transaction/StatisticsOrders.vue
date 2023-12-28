<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content"></div>
      <statistics-trans-component></statistics-trans-component>
    </div>
  </div>
</template>

<script>
import NavBarEmployee from "./components/NavBarEmployee.vue";
import StatisticsTransComponent from "./components/StatisticsTransComponent.vue";
export default {
  name: "ConfirmOrders",
  components: {
    NavBarEmployee,
    StatisticsTransComponent,
  },
};
</script>
<style scoped></style>
