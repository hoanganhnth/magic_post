<template>
  <div class="dashboard">
    <menu-component></menu-component>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <creat-account :transactionStaffs="transactionStaffs"></creat-account>
      </div>
    </div>
  </div>
</template>

<script>
import MenuComponent from "./component/MenuComponent.vue";
import CreatAccount from "./component/CreatAccount.vue";
import { StaffService } from "../../service/StaffService";
export default {
  name: "CreatAccountTransaction",
  components: { MenuComponent, CreatAccount },
  data() {
    return {
      transactionStaffs: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const res = await StaffService.getAllStaff();
        if (res.error_code === 0) {
          this.transactionStaffs = res.data.transactionStaff;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
