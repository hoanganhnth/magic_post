<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <confirm-component></confirm-component>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmComponent from "./components/ConfirmComponent.vue";
import NavBarEmployee from "./components/NavBarEmployee.vue";

export default {
  name: "ConfirmOrders",
  components: {
    NavBarEmployee,
    ConfirmComponent,
  },
};
</script>
<style scoped></style>
