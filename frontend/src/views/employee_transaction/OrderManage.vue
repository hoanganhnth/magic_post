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
            v-on:failedOrder="failedOrder"
            v-on:successOrder="successOrder"
            :orderItems="orderItems"
            :list_order="list_order"
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
      list_order: [
        // {
        //   id: 1,
        //   created_at: "21/10/2022",
        //   goods_weight: "500g",
        //   status: "Nhận từ điểm tập kết",
        // },
        // {
        //   id: 2,
        //   created_at: "21/10/2022",
        //   goods_weight: "500g",
        //   status: "Nhận từ điểm tập kết",
        // },
        // {
        //   id: 3,
        //   created_at: "21/10/2022",
        //   goods_weight: "500g",
        //   status: "Nhận từ điểm tập kết",
        // },
      ], // biến này lưu các đơn cần xác nhận thành công hay thất bại
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
          console.log(this.shipments);
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
      try {
        const res3 = await StaffService.getShipmentDeliver();
        if (res3.error_code === 0) {
          this.list_order = res3.data.relatedShipments;
        } else {
          console.log(res3.message);
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
    async failedOrder(data) {
      try {
        const payload = {
          Success: false,
          shipmentId: data.id,
        };
        const res = await StaffService.confirmShipmentSuOrCa(payload);
        if (res.error_code === 0) {
          console.log(res.message);
          data.status = "Cancel";
          this.shipments.push(data);
          (this.loadData = true),
            (this.list_order = this.list_order.filter(function (items) {
              return items !== data;
            }));
          // console.log(data);
          this.loadData = false;
        } else {
          console.log(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async successOrder(data) {
      try {
        const payload = {
          Success: true,
          shipmentId: data.id,
        };
        const res = await StaffService.confirmShipmentSuOrCa(payload);
        if (res.error_code === 0) {
          console.log(res.message);
          (this.loadData = true),
            (this.list_order = this.list_order.filter(function (items) {
              return items !== data;
            }));
          // console.log(data);
        } else {
          console.log(res.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
<style scoped>
#creat {
  margin-top: 20px;
}
</style>
