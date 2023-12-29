<template>
  <div class="dashboard">
    <menu-component></menu-component>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <statistical-component
          :shipments="shipments"
          :collectionPoint="collectionPoint"
        ></statistical-component>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticalComponent from "./components/StatisticalComponent.vue";
import MenuComponent from "./components/MenuComponent.vue";
import { StaffService } from "../../service/StaffService";
export default {
  name: "StatisticalCollection",
  components: { MenuComponent, StatisticalComponent },
  data() {
    return {
      shipments: [],
      collectionPoint: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const res = await StaffService.getShipmentCollection();
        if (res.error_code === 0) {
          this.shipments = res.data.shipments;
          this.collectionPoint = res.data.collectionPoint;
          // console.log(this.shipments);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
