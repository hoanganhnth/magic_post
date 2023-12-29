<template>
  <v-app>
    <v-main>
      <v-card>
        <v-card-title>
          Thống kê hàng hóa tại {{ transactionPoint.name }}
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-form>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="fromDate"
                      label="Từ ngày"
                      type="date"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="toDate"
                      label="Đến ngày"
                      type="date"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="getData">Lọc dữ liệu</v-btn>
        </v-card-actions>

        <v-data-table :loading="loadData" :items="items" :headers="headers">
        </v-data-table>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  watch: {
    selectedCollectionPoint: function (newCollectionPoint) {
      // Lưu ý: Bạn có thể cần thay đổi logic dưới đây để phản ánh các yêu cầu của bạn
      this.updateTransactions(newCollectionPoint);
    },
    shipments(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initialize();
      }
    },
  },

  name: "StatisticalComponent",
  data() {
    return {
      selectedTransactionPoint: null, // 2 bien nay luu gia tri diem giao dich+ diem tap ket da chon trong form
      selectedCollectionPoint: null,
      fromDate: new Date().toISOString().substr(0, 10), // Giá trị mặc định là ngày hôm nay
      toDate: new Date().toISOString().substr(0, 10), // Giá trị mặc định là ngày hôm nay
      loadData: false,
      // bien collections luu cac diem tapj ket
      colletions: [
        { id: 1, state: "Hà Nội" },
        { id: 2, state: "Hải Phòng" },
        { id: 3, state: "Đà Nẵng" },
        { id: 4, state: "TP HCM" },
      ],
      // bien transactions ten cac diem giao dich thuoc diem tap ket da chon
      transactions: [],
      // bien items luu thong tin don hang
      items: [],
      headers: [
        {
          title: "ID",
          align: "start",
          sortable: false,
          key: "id",
        },
        { title: "Thời gian gửi", key: "created_at", align: "end" },
        { title: "Cập nhật lúc", key: "updated_at", align: "end" },
        { title: "Khối lượng (g)", key: "goods_weight", align: "end" },
        { title: "Giá", key: "fee", align: "end" },
      ],
    };
  },
  created() {
    this.initialize();
  },
  props: {
    shipments: {
      type: Array,
      required: true,
    },
    transactionPoint: {
      type: Array,
      required: true,
    },
  },
  methods: {
    initialize() {
      this.items = this.shipments;
    },
    getData() {
      this.loadData = true;

      // Lấy thông tin từ điểm tập kết đã chọn
      if (this.selectedTransactionPoint) {
        if (this.selectedTransactionPoint == "Cầu Giấy")
          this.items = [
            {
              id: 1,
              pointOfSale: "144 Xuân Thủy",
              shippingTime: "2 ngày",
              estimatedReceivedTime: "4 ngày",
              weight: 200,
              price: 100000,
            },
            {
              id: 2,
              pointOfSale: "75 Hồ Tùng Mậu",
              shippingTime: "3 ngày",
              estimatedReceivedTime: "6 ngày",
              weight: 200,
              price: 200000,
            },
            {
              id: 3,
              pointOfSale: "123 Trần Duy Hưng",
              shippingTime: "4 ngày",
              estimatedReceivedTime: "8 ngày",
              weight: 300,
              price: 300000,
            },
          ];
        // Thực hiện các thao tác khác với thông tin đã lấy
      }

      this.loadData = false;
    },
    updateTransactions(selectedCollectionPoint) {
      // hàm này sẽ cập nhật giá trị của các điểm giao dịch thuộc điểm tập kết đã chọn
      if (selectedCollectionPoint === "Hà Nội") {
        this.transactions = [
          {
            id: 1,
            state: "Cầu Giấy",
          },
          {
            id: 2,
            state: "Hoàng Mai",
          },
          // Thêm các điểm giao dịch khác nếu cần
        ];
      } else if (selectedCollectionPoint === "Hải Phòng") {
        this.transactions = [
          {
            id: 1,
            state: "TP Hải Phòng",
          },
          {
            id: 2,
            state: "Cát Bà",
          },
          // Thêm các điểm giao dịch khác nếu cần
        ];
        // Thêm logic xử lý cho điểm tập kết Hải Phòng
      } else if (selectedCollectionPoint === "Đà Nẵng") {
        this.transactions = [
          {
            id: 1,
            state: "TP Đà Nẵng",
          },
          {
            id: 2,
            state: "ABCD",
          },
          // Thêm các điểm giao dịch khác nếu cần
        ];
        // Thêm logic xử lý cho điểm tập kết Hải Phòng
      } else {
        this.transactions = [
          {
            id: 1,
            state: "Quan 1",
          },
          {
            id: 2,
            state: "Quan 7",
          },
          // Thêm các điểm giao dịch khác nếu cần
        ];
      }

      // Các điều kiện khác cho các điểm tập kết khác
    },

    formatDate(date) {
      return date
        ? new Date(date).toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "";
    },
  },
};
</script>
<style scoped>
span {
  color: black;
}
</style>
