<template>
    <div class="container">
        <nap-bar-boss></nap-bar-boss>
      <h1>Thống kê hàng gửi, hàng nhận</h1>
      <table class="table">
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Số lượng hàng gửi</th>
            <th>Số lượng hàng nhận</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.date }}</td>
            <td>{{ item.quantity_sent }}</td>
            <td>{{ item.quantity_received }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
import NapBarBoss from '../../components/NapBarBoss.vue';
  export default {
    name: "OrderStatistics",
  components: { NapBarBoss },
    data() {
      return {
        items: [],
      };
    },
    mounted() {
      // Lấy dữ liệu từ server
      this.$axios
        .get("/api/statistics")
        .then((response) => {
          this.items = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  };
  </script>