<template>
  <div class="dashboard">
    <nap-bar-boss></nap-bar-boss>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <v-app>
          <v-main>
            <employee-collection
              :employeeCollection="employeeCollection"
              :collectionPoint="collectionPoint"
            >
            </employee-collection>
            <employee-transaction
              :employeeTransaction="employeeTransaction"
              :transactionPoint="transactionPoint"
            ></employee-transaction>
          </v-main>
        </v-app>
      </div>
    </div>
  </div>
</template>

<script>
import { LeadService } from "../../service/LeadService";
import NapBarBoss from "../../components/boss/NapBarBoss.vue";
import EmployeeCollection from "./components/EmployeeCollection.vue";
import EmployeeTransaction from "./components/EmployeeTransaction.vue";

export default {
  components: { NapBarBoss, EmployeeCollection, EmployeeTransaction },

  name: "ManageEmployee",
  data() {
    return {
      employeeCollection: [],
      employeeTransaction: [],
      collectionPoint: [],
      transactionPoint: [],
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const res = await LeadService.getAllHead();
        if (res.error_code === 0) {
          this.employeeCollection = res.data.collectionHead;
          this.employeeTransaction = res.data.transactionHead;
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const res = await LeadService.getAllPermission();
        if (res.error_code === 0) {
          this.collectionPoint = res.data.collectionPermission;
          this.transactionPoint = res.data.transactionPermission;
        } else {
          console.error(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
