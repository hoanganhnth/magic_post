<template>
  <v-container class="container">
    <h4>Thống kê đơn hàng</h4>
    <v-row justify="space-around">
      <v-col cols="4">
        <v-card>
          <v-card-title>Tổng số đơn hàng</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-icon
                  size="80"
                  color="purple"
                  icon="mdi-package-variant-closed"
                ></v-icon>
              </v-col>
              <v-col>
                <h5>Số lượng</h5>
                <h6>{{ totalOrders }}</h6>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>Số đơn đã nhận</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-icon
                  size="80"
                  color="blue - grey - darken - 2"
                  icon="mdi-truck-delivery"
                ></v-icon>
              </v-col>
              <v-col>
                <h5>Số lượng</h5>
                <h6>{{ ordersReceived }}</h6>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="4">
        <v-card>
          <v-card-title>Số đơn thành công</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-icon
                  size="80"
                  color="green"
                  icon="mdi-check-circle"
                ></v-icon>
              </v-col>
              <v-col>
                <h5>Số lượng</h5>
                <h6>{{ ordersSuccess }}</h6>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-card-title>Số đơn gửi thất bại</v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <v-icon size="80" color="red" icon="mdi-alert-circle"></v-icon>
              </v-col>
              <v-col>
                <h5>Số lượng</h5>
                <h6>{{ ordersFail }}</h6>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      totalOrders: 0,
      ordersReceived: 0,
      ordersSuccess: 0,
      ordersFail: 0,
      address: "",
    };
  },
  watch: {
    transactionPoint(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initialize();
      }
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.totalOrders = 50;
      this.ordersReceived = 30;
      this.ordersSuccess = 15;
      this.ordersFail = 5;
      this.address = 10;
    },
  },
};
</script>

<style scoped>
h4 {
  margin-left: 5%;
  margin-bottom: 5%;
}
.container {
  max-height: 70%;
  max-width: 100%;
}
</style>
