<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <creat-component></creat-component>
      </div>
    </div>
  </div>
</template>

<script>
import CreatComponent from "./component/CreatComponent.vue";
export default {
  name: "CreatCollection",
  components: {
    CreatComponent,
  },
};
</script>
<style scoped></style>
