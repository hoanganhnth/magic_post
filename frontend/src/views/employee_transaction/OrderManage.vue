<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <v-col>
          <order-details></order-details>
          <confirm-component></confirm-component>
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmComponent from "./components/ConfirmComponent.vue";
import NavBarEmployee from "./components/NavBarEmployee.vue";
import OrderDetails from "./components/OrderDetails.vue";

export default {
  name: "OrderManage",
  components: {
    NavBarEmployee,
    OrderDetails,
    ConfirmComponent,
  },
};
</script>
<style scoped>
#creat {
  margin-top: 20px;
}
</style>
