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
      shipments: [
        // đây là list các đơn hàng cần thêm
        {
          id: 8,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Gửi điểm tập kết",
        },
        {
          id: 9,
          fee: "250",
          created_at: "20/12/2023",
          goods_weight: "400g",
          status: "Gửi điểm tập kết",
        },
        {
          id: 121,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Gửi điểm tập kết",
        },
      ],
      orderItems: [
        // đây là list các đơn hàng cần xác nhận
        {
          id: 1,
          fee: "100",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Gửi điểm tập kết",
        },
        {
          id: 2,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 3,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 4,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 5,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 6,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 7,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 8,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        // Add more items as needed
      ],
    };
  },

  created() {
    this.initialize();
  },
  methods: {
    initialize() {},
    // async initialize() {
    //   try {
    //     const res = await StaffService.getShipmentTransaction();
    //     if (res.error_code === 0) {
    //       this.shipments = res.data.relatedShipments;
    //       console.log(this.shipments);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    confirmOrder(data) {
      (this.loadData = true),
        (this.orderItems = this.orderItems.filter(function (items) {
          return items !== data;
        }));
      this.shipments.push(data);
      console.log(data);
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
