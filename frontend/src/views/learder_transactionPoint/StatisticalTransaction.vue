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
import StatisticalComponent from "./component/StatisticalComponent.vue";
import MenuComponent from "./component/MenuComponent.vue";

export default {
  name: "StatisticalTransaction",
  components: { MenuComponent, StatisticalComponent },
};
</script>
