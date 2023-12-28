<template>
  <div class="dashboard">
    <navbar></navbar>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <manage-order></manage-order>
      </div>
    </div>
  </div>
</template>

<script>
import ManageOrder from "./component/ManageOrder.vue";
import Navbar from "./component/Navbar.vue";

export default {
  name: "ConfirmCollection",
  components: {
    ManageOrder,
    Navbar,
  },
};
</script>
<style scoped>
.dashboard-content {
  padding-left: 40px;
}
</style>
