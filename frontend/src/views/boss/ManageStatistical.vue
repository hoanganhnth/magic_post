<template>
  <div class="dashboard">
    <nap-bar-boss></nap-bar-boss>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <statistical-component></statistical-component>
      </div>
    </div>
  </div>
</template>

<script>
import NapBarBoss from "../../components/boss/NapBarBoss.vue";

import StatisticalComponent from "./components/StatisticalComponent.vue";
export default {
  components: { NapBarBoss, StatisticalComponent },
  name: "ManageStatistical",
  data() {
    return {};
  },
  methods: {},
};
</script>
