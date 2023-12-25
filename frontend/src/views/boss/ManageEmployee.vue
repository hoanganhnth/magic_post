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

<style scoped>
#add {
  background-color: #3498db;
  color: #fff;
  padding: 10px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
}

#add i {
  margin-right: 8px;
}

#add:hover {
  background-color: #2980b9;
}

.container {
  width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 30px;
  font-weight: bold;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 10px;
}

th {
  background-color: #337ab7;
  color: #fff;
}

.container-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

input {
  margin-bottom: 10px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  font-size: 18px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

/* Add component-specific styles here */
</style>
