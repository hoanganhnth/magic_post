<template>
  <v-container>
    <v-card>
      <v-card-title>Danh sách đơn hàng cần xác nhận</v-card-title>

      <v-row>
        <v-col v-for="(item, index) in orderItems" :key="index" cols="12">
          <v-card class="card">
            <v-card-title>ID đơn hàng: {{ item.id }}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="4">
                  <p>Thời gian gửi: {{ item.created_at }}</p>
                </v-col>
                <v-col cols="4">
                  <p>Khối lượng: {{ item.goods_weight }}</p>
                </v-col>
                <v-col cols="4">
                  <p>Thông tin đơn hàng: {{ item.status }}</p>
                </v-col>
              </v-row>
            </v-card-text>
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
            <v-card-text>Không có đơn hàng nào cần xác nhận</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    orderItems: Object,
  },
  data() {
    return {};
  },
  methods: {
    confirmOrder(itemDelete) {
      this.$emit("confirmOrder", itemDelete);
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
