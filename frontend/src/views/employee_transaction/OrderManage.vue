<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <v-col>
          <order-details :shipments="shipments"></order-details>
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
import { StaffService } from "../../service/StaffService";
export default {
  name: "CreatAccountCollection",
  components: {
    NavBarEmployee,
    OrderDetails,
    CreatOrders,
  },
  data() {
    return {
      shipments: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        console.log(1);
        const res = await StaffService.getShipmentTransaction();
        if (res.error_code === 0) {
          this.shipments = res.data.relatedShipments;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
#creat {
  margin-top: 20px;
}
</style>
