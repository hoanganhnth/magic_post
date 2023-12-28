<template>
  <v-container class="container">
    <h4>Thống kê đơn hàng tại điểm giao dịch {{ address }}</h4>
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
          <v-card-actions>
            <v-btn color="blue"> Chi tiết </v-btn>
          </v-card-actions>
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
          <v-card-actions>
            <v-btn color="blue"> Chi tiết </v-btn>
          </v-card-actions>
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
          <v-card-actions>
            <v-btn color="blue"> Chi tiết </v-btn>
          </v-card-actions>
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
          <v-card-actions>
            <v-btn color="blue"> Chi tiết </v-btn>
          </v-card-actions>
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
      address: "144 Xuân thủy",
    };
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    transactionPoint(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initialize();
      }
    },
  },
  props: {
    transactionPoint: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      if (this.transactionPoint) {
        this.totalOrders = this.transactionPoint.total_shipment;
        this.ordersReceived = this.transactionPoint.receive_shipment;
        this.ordersSuccess = this.transactionPoint.success_shipment;
        this.ordersFail = this.transactionPoint.cancel_shipment;
        this.address = this.transactionPoint.name;
      }
    },
    fetchData() {
      // Lấy dữ liệu từ API hoặc database
      // ...
      // this.totalOrders = 300;
      // this.ordersReceived = 250;
      // this.ordersSuccess = 230;
      // this.ordersFail = 20;
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
  max-height: 50%;
  max-width: 100%;
}
</style>
