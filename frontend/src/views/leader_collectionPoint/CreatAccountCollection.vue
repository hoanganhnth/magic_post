<template>
  <div class="dashboard">
    <menu-component></menu-component>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <creat-account :collectionStaffs="collectionStaffs"></creat-account>
      </div>
    </div>
  </div>
</template>

<script>
import MenuComponent from "./components/MenuComponent.vue";
import CreatAccount from "./components/CreatAccount.vue";
import { StaffService } from "../../service/StaffService";
export default {
  name: "CreatAccountCollection",
  components: { MenuComponent, CreatAccount },
  data() {
    return {
      collectionStaffs: [],
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
          this.collectionStaffs = res.data.collectionStaff;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
