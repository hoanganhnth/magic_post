<template>
  <div class="dashboard">
    <nap-bar-boss></nap-bar-boss>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <manage-components
          :collectionPoints="collectionPoints"
          :transactionPoints="transactionPoints"
        ></manage-components>
      </div>
    </div>
  </div>
</template>

<script>
import { LeadService } from "../../service/LeadService";
import NapBarBoss from "../../components/boss/NapBarBoss.vue";
import ManageComponents from "./components/ManageComponents.vue";
export default {
  components: { NapBarBoss, ManageComponents },
  name: "ManageSystem",
  data() {
    return {
      collectionPoints: [],
      transactionPoints: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const res1 = await LeadService.getCollectionPoint();
        const res2 = await LeadService.getTransactionPoint();
        if (res1.error_code === 0) {
          this.collectionPoints = res1.data.collectionPoints;
          // console.log( this.collectionPoints);
        }
        if (res2.error_code === 0) {
          this.transactionPoints = res2.data.transactionPoints;
          // console.log( this.transactionPoints);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
