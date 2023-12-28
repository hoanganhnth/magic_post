<template>
  <v-card>
    <v-card-title>Thống kê đơn hàng</v-card-title>

    <v-data-table :loading="loadData" :items="items" :headers="headers">
      <template v-slot:[`item.status`]="{ value }">
        <v-chip :color="getColor(value)"> {{ value }} </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "CreatOrder",
  data() {
    return {
      loading: false,
      items: [],
      headers: [
        {
          title: "ID",
          align: "start",
          sortable: false,
          key: "id",
        },
        { title: "Thời gian gửi", key: "created_at", align: "center" },
        { title: "Khối lượng (g)", key: "goods_weight", align: "center" },
        { title: "Giá", key: "fee", align: "center" },
        { title: "Trạng thái đơn hàng", key: "status", align: "center" },
      ],
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.items = [
        {
          id: 1,
          fee: "100",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Chuyển thành công",
        },
        {
          id: 2,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Chuyển thành công",
        },
        {
          id: 3,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Chuyển thất bại",
        },
        {
          id: 4,
          fee: "200",
          created_at: "20/12/2023",
          goods_weight: "500g",
          status: "Chuyển thất bại",
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
      ];
    },
    getColor(status) {
      if (status === "Chuyển thành công") return "green";
      else if (status === "Chuyển thất bại") return "red";
      else return "orange";
    },
  },
};
</script>
