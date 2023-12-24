<template>
  <div class="dashboard">
    <nap-bar-boss></nap-bar-boss>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <statistical-component :collectionPoints = "collectionPoints"></statistical-component>
      </div>
    </div>
  </div>
</template>

<script>
import NapBarBoss from "../../components/boss/NapBarBoss.vue";
import { LeadService } from "../../service/LeadService";
import StatisticalComponent from "./components/StatisticalComponent.vue";
export default {
  components: { NapBarBoss, StatisticalComponent },
  name: "ManageStatistical",
  data() {
    return {
      collectionPoints: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async  initialize() {
      try {
        const res1 = await LeadService.getAllPoint();
        if (res1.error_code === 0) {
          this.collectionPoints = res1.data.collectionPoints;
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
};
</script>
