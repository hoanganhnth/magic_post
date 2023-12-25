<template>
  <div class="dashboard">
    <nav-bar-employee></nav-bar-employee>
    <div class="dashboard-app">
      <div class="dashboard-content">
        <v-col>
          <order-details :items="items" :loadData="loadData"></order-details>
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

export default {
  name: "OrderManage",
  data: function () {
    return {
      loadData: false,
      items: [
        {
          id: 1,
          shippingTime: "16/01/2023",
          weight: 100,
          status: "Đang chuyển",
        },
        {
          id: 2,
          shippingTime: "10/10/2023",
          weight: 200,
          status: "Chuyển thất bại",
        },
        {
          id: 3,
          shippingTime: "20/10/2023",
          weight: 300,
          status: "Chuyển thành công",
        },
        {
          id: 4,
          shippingTime: "20/10/2023",
          weight: 300,
          status: "Nhận từ điểm tập kết",
        },
      ],
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
  methods: {
    confirmOrder(data) {
      (this.loadData = true),
        (this.orderItems = this.orderItems.filter(function (items) {
          return items !== data;
        }));
      this.items.push(data);
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
