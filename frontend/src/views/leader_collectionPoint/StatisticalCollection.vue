<template>
  <div class="dashboard">
    <menu-component></menu-component>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <statistical-component></statistical-component>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticalComponent from "./components/StatisticalComponent.vue";
import MenuComponent from "./components/MenuComponent.vue";

export default {
  name: "StatisticalCollection",
  components: { MenuComponent, StatisticalComponent },
};
</script>
