<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <v-col>
          <order-details
            :shipments="shipments"
            :loadData="loadData"
          ></order-details>
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
import OrderDetails from "./components/OrderDetails.vue";
import { StaffService } from "../../service/StaffService";
export default {
  name: "OrderManage",
  data: function () {
    return {
      loadData: false,
      shipments: [],
      orderItems: [
        // đây là list các đơn hàng cần xác nhận
        {
          id: 1,
          name: "Product 1",
          shippingTime: "20/12/2023",
          weight: "500g",
          status: "Chuyển thành công",
        },
        {
          id: 2,
          name: "Product 2",
          shippingTime: "20/12/2023",
          weight: "500g",
          status: "Chuyển thành công",
        },
        {
          id: 3,
          name: "Product 3",
          shippingTime: "20/12/2023",
          weight: "500g",
          status: "Chuyển thất bại",
        },
        {
          id: 4,
          name: "Product 4",
          shippingTime: "20/12/2023",
          weight: "500g",
          status: "Chuyển thất bại",
        },
        {
          id: 5,
          name: "Product 5",
          shippingTime: "20/12/2023",
          weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 6,
          name: "Product 6",
          shippingTime: "20/12/2023",
          weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 7,
          name: "Product 7",
          shippingTime: "20/12/2023",
          weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 8,
          name: "Product 8",
          shippingTime: "20/12/2023",
          weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        // Add more items as needed
      ],
    };
  },
  components: {
    NavBarEmployee,
    OrderDetails,
    ConfirmComponent,
  },
  created() {
    this.initialize();
  },
  methods: {
    async initialize() {
      try {
        const res = await StaffService.getShipmentTransaction();
        if (res.error_code === 0) {
          this.shipments = res.data.relatedShipments;
          console.log(this.shipments);
        }
      } catch (error) {
        console.error(error);
      }
    },
    confirmOrder(data) {
      (this.loadData = true),
        (this.orderItems = this.orderItems.filter(function (items) {
          return items !== data;
        }));
      this.shipments.push(data);
      console.log(this.items);
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
