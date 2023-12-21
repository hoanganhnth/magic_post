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
import MenuComponent from "./component/MenuComponent.vue";
import CreatAccount from "./component/CreatAccount.vue";

export default {
  name: "CreatAccountTransaction",
  components: { MenuComponent, CreatAccount },
};
</script>
