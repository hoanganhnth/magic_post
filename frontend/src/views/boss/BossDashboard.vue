<template>
  <div class="dashboard">
    <nap-bar-boss></nap-bar-boss>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <h3>Trang chủ</h3>
        <chart-orders></chart-orders>
      </div>
    </div>
  </div>
</template>

<script>
import NapBarBoss from "../../components/boss/NapBarBoss.vue";
import ChartOrders from "././components/ChartOrders.vue";

export default {
  components: { NapBarBoss, ChartOrders },

  name: "BossDashboard",
  data() {
    return {};
  },
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>
