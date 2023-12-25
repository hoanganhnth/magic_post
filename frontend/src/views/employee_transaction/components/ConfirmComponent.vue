<template>
  <v-container>
    <v-card>
      <v-card-title>Danh sách đơn hàng cần xác nhận</v-card-title>

      <v-row>
        <v-col v-for="(item, index) in orderItems" :key="index" cols="12">
          <v-card class="card">
            <v-card-title>Tên đơn hàng: {{ item.name }}</v-card-title>
            <v-card-content class="content"
              >Giá: {{ item.price }}</v-card-content
            >
            <v-card-content class="content"
              >Khối lượng: {{ item.weight }}</v-card-content
            >
            <v-card-content class="content"
              >Thông tin đơn hàng: {{ item.status }}</v-card-content
            >
            <v-card-actions>
              <v-btn color="primary" @click="confirmOrder(item)"
                >Xác nhận đơn hàng
                <v-icon id="icon" size="25" color="green" class="me-2">
                  <i class="fas fa-check"></i
                ></v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="orderItems.length === 0">
        <v-col cols="12">
          <v-card>
            <v-card-text>No items in the order</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      orderItems: [
        {
          id: 1,
          name: "Product 1",
          price: "$20",
          weight: "500g",
          status: "Chuyển thành công",
        },
        {
          id: 2,
          name: "Product 2",
          price: "$30",
          weight: "500g",
          status: "Chuyển thành công",
        },
        {
          id: 3,
          name: "Product 3",
          price: "$20",
          weight: "500g",
          status: "Chuyển thất bại",
        },
        {
          id: 4,
          name: "Product 4",
          price: "$30",
          weight: "500g",
          status: "Chuyển thất bại",
        },
        {
          id: 5,
          name: "Product 5",
          price: "$20",
          weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 6,
          name: "Product 6",
          price: "$30",
          weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 7,
          name: "Product 7",
          price: "$20",
          weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        {
          id: 8,
          name: "Product 8",
          price: "$30",
          weight: "500g",
          status: "Nhận từ điểm tập kết",
        },
        // Add more items as needed
      ],
    };
  },
  methods: {
    confirmOrder(itemDelete) {
      this.orderItems = this.orderItems.filter(function (items) {
        return items !== itemDelete;
      });
    },
  },
};
</script>

<style scoped>
#icon {
  margin-left: 20px;
}

.card {
  padding-left: 10px;
}

.content {
  padding-left: 20px;
}

/* Add your custom styles here if needed */
</style>
