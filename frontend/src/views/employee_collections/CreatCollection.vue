<template>
  <div class="dashboard">
    <navbar></navbar>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <creat-component
          v-on:addOrder="addOrder"
          :shipments="shipments"
          :loadData="loadData"
        ></creat-component>
        <confirm-orders
          v-on:confirmOrder="confirmOrder"
          :orderItems="orderItems"
        ></confirm-orders>
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmOrders from "./component/ConfirmOrders.vue";
import CreatComponent from "./component/CreatComponent.vue";
import Navbar from "./component/Navbar.vue";
import { StaffService } from "../../service/StaffService";
export default {
  name: "CreatCollection",
  components: {
    CreatComponent,
    ConfirmOrders,
    Navbar,
  },
  data: function () {
    return {
      loadData: false,
      shipments: [],
      orderItems: [],
    };
  },

  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        let payload1 = "Receive";
        const res1 = await StaffService.getShipmentCollectionByStatus(payload1);
        if (res1.error_code === 0) {
          this.shipments = res1.data.relatedShipments;
          // console.log(this.shipments);
        }
      } catch (error) {
        console.error(error);
      }
      try {
        const payload2 = "Waiting";
        const res2 = await StaffService.getShipmentCollectionByStatus(payload2);
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
      if (data.status === "Shipped from CollectionPoint") {
        try {
          const shipmentId = data.id;
          const res = await StaffService.confirmShipmentFromCPToCP(shipmentId);
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
      } else if (data.status == "Shipped from TransactionPoint") {
        try {
          const shipmentId = data.id;
          const res = await StaffService.confirmShipmentFromTPToCP(shipmentId);
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
<style scoped></style>
