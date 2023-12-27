<template>
  <v-card>
    <v-card-title>Thống kê hàng hóa</v-card-title>

    <v-data-table :loading="loadData" :items="items" :headers="headers">
      <template v-slot:[`item.status`]="{ value }">
        <v-chip :color="getColor(value)"> {{ value }} </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "OderDetails",
  data() {
    return {
      loadData: false,
      items: [],
      // items: [
      //   {
      //     id: 1,
      //     shippingTime: "16/01/2023",
      //     weight: 100,
      //     price: 100000,
      //     status: "Trả lại điểm giao dịch",
      //   },
      //   {
      //     id: 2,
      //     shippingTime: "10/10/2023",
      //     weight: 200,
      //     price: 200000,
      //     status: "Chuyển thất bại",
      //   },
      //   {
      //     id: 3,
      //     shippingTime: "20/10/2023",
      //     weight: 300,
      //     price: 300000,
      //     status: "Chuyển thành công",
      //   },
      // ],
      headers: [
        {
          title: "ID",
          align: "start",
          sortable: false,
          key: "id",
        },
        { title: "Thời gian gửi", key: "created_at", align: "center" },
        { title: "Tên hàng", key: "goods_name", align: "center" },
        { title: "Khối lượng (g)", key: "goods_weight", align: "center" },
        { title: "Giá", key: "fee", align: "center" },
        { title: "Trạng thái đơn hàng", key: "status", align: "center" },
      ],
    };
  },
  props: {
    shipments: {
      type: Array,
      required: true,
    },
  },

  created() {
    this.initialize();
  },
  watch: {
    shipments(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initialize();
      }
    },
  },

  methods: {
    initialize() {
      this.items = this.shipments;
    },
    getColor(status) {
      if (status === "Chuyển thành công") return "green";
      else if (status === "Chuyển thất bại") return "orange";
      else return "red";
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
