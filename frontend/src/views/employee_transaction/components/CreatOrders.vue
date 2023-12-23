<template>
  <v-card>
    <v-row>
      <!-- Quản lý Đơn hàng -->
      <v-col cols="12">
        <v-card>
          <v-card-title
            >Danh sách đơn hàng chuyển đến điểm tập kết</v-card-title
          >
          <v-card-text>
            <v-data-table
              :loading="loading"
              :items="orders"
              :headers="orderHeaders"
              :items-per-page="5"
            ></v-data-table>
            <v-btn @click="showOrderDialog = true" color="primary"
              >Thêm đơn hàng</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog để thêm đơn hàng -->
    <v-dialog v-model="showOrderDialog" max-width="600px">
      <v-card>
        <v-card-title>Thêm đơn hàng</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addOrder">
            <v-text-field
              v-model="newOrders.shippingTime"
              label="Thời gian gửi hàng"
            ></v-text-field>
            <v-text-field
              v-model="newOrders.address"
              label="Địa chỉ"
            ></v-text-field>
            <v-text-field
              v-model="newOrders.weight"
              label="Khối lượng (g)"
            ></v-text-field>
            <v-text-field
              v-model="newOrders.price"
              label="Giá (đ)"
            ></v-text-field>
            <!-- Các trường thông tin khác nếu cần -->

            <v-btn type="submit" color="primary">Lưu</v-btn>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showOrderDialog = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      showOrderDialog: false,
      newOrders: {
        id: 0,
        shippingTime: "",
        address: "",
        weight: "",
        price: "",
      },
      // ... (các dữ liệu và thuộc tính khác)
      orderHeaders: [
        {
          title: "ID",
          align: "start",
          sortable: false,
          key: "id",
        },
        { title: "Thời gian gửi", key: "shippingTime", align: "end" },
        { title: "Địa chỉ", key: "address", align: "end" },
        { title: "Khối lượng", key: "weight", align: "end" },
        { title: "Giá", key: "price", align: "end" },
      ],
      orders: [
        {
          id: 1,
          shippingTime: "20/10/2023",
          address: "Ha nội",
          weight: 300,
          price: 300000,
        },
        {
          id: 2,
          shippingTime: "20/10/2023",
          address: "Ha nội",
          weight: 300,
          price: 300000,
        },
        {
          id: 3,
          shippingTime: "20/10/2023",
          address: "Ha nội",
          weight: 300,
          price: 300000,
        },
      ],
      loading: false,
    };
  },

  methods: {
    addOrder() {
      this.loading = true;
      this.newOrders.id = this.orders.length + 1;
      this.orders.push({ ...this.newOrders });
      this.showOrderDialog = false;
      this.loading = false;
      // Có thể thêm logic xử lý khác nếu cần
    },
  },
};
</script>
<style scoped></style>
