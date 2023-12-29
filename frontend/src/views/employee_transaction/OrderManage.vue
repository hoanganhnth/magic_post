<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <v-col>
          <creat-order
            v-on:addOrder="addOrder"
            :shipments="shipments"
            :loadData="loadData"
          ></creat-order>
          <confirm-component
            v-on:confirmOrder="confirmOrder"
            :orderItems="orderItems"
          ></confirm-component>
        </v-col>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmComponent from "./components/ConfirmComponent.vue";
import NavBarEmployee from "./components/NavBarEmployee.vue";
import CreatOrder from "./components/CreatOrder.vue";
import { StaffService } from "../../service/StaffService";
export default {
  name: "OrderManage",
  data: function () {
    return {
      loadData: false,
      shipments: [],
      orderItems: [],
    };
  },
  components: {
    NavBarEmployee,
    ConfirmComponent,
    CreatOrder,
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        let payload1 = "Receive";
        const res1 = await StaffService.getShipmentTransactionByStatus(
          payload1
        );
        if (res1.error_code === 0) {
          this.shipments = res1.data.relatedShipments;
          // console.log(this.shipments);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const payload2 = "Waiting";
        const res2 = await StaffService.getShipmentTransactionByStatus(
          payload2
        );
        if (res2.error_code === 0) {
          this.orderItems = res2.data.relatedShipments;
          // console.log(this.orderItems);
        } else {
          console.log(res2.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async confirmOrder(data) {
      // console.log(data);
      try {
        const shipmentId = data.id;
        const res = await StaffService.confirmShipmentFromCPToTP(shipmentId);
        if (res.error_code === 0) {
          data.status = res.data.shipment_update.status;
          this.shipments.push(data);
          (this.loadData = true),
            (this.orderItems = this.orderItems.filter(function (items) {
              return items !== data;
            }));
          console.log(res.message);
        } else {
          console.log(res.message);
        }
      } catch (error) {
        console.error(error);
      }

      this.loadData = false;
    },

    addOrder(data) {
      (this.loadData = true),
        (this.shipments = this.shipments.filter(function (items) {
          return items !== data;
        }));
      console.log(data);
      this.loadData = false;
    },
  },
};
</script>
<style scoped>
#creat {
  margin-top: 20px;
}
</style>
