<template>
  <div class="dashboard">
    <menu-component></menu-component>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <statistical-component
          :shipments="shipments"
          :transactionPoint="transactionPoint"
        ></statistical-component>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticalComponent from "./component/StatisticalComponent.vue";
import MenuComponent from "./component/MenuComponent.vue";
import { StaffService } from "../../service/StaffService";
export default {
  name: "StatisticalTransaction",
  components: { MenuComponent, StatisticalComponent },
  data() {
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
          // console.log(res.data);
          this.shipments = res.data.relatedShipments;
          this.transactionPoint = res.data.transactionPoint;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
