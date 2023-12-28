<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content"></div>
      <statistics-trans-component
        :transactionPoint="transactionPoint"
      ></statistics-trans-component>
      <list-orders class="list" :shipments="shipments"></list-orders>
    </div>
  </div>
</template>

<script>
import ListOrders from "./components/ListOrders.vue";
import NavBarEmployee from "./components/NavBarEmployee.vue";
import StatisticsTransComponent from "./components/StatisticsTransComponent.vue";
import { StaffService } from "../../service/StaffService";
export default {
  name: "ConfirmOrders",
  components: {
    NavBarEmployee,
    StatisticsTransComponent,
    ListOrders,
  },
  data: function () {
    return {
      shipments: [],
      transactionPoint: null,
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      try {
        const res = await StaffService.getShipmentTransaction();
        if (res.error_code === 0) {
          this.shipments = res.data.relatedShipments;
          this.transactionPoint = res.data.transactionPoint;
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.list {
  margin-left: 5%;
}
</style>
