<template>
  <div class="dashboard">
    <menu-component></menu-component>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <creat-account></creat-account>
      </div>
    </div>
  </div>
</template>

<script>
import MenuComponent from "./components/MenuComponent.vue";
import CreatAccount from "./components/CreatAccount.vue";

export default {
  name: "CreatAccountCollection",
  components: { MenuComponent, CreatAccount },
};
</script>
