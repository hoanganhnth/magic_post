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
      items: [
        {
          id: 1,
          shippingTime: "16/01/2023",
          weight: 100,
          price: 100000,
          status: "Đang chuyển",
        },
        {
          id: 2,
          shippingTime: "10/10/2023",
          weight: 200,
          price: 200000,
          status: "Chuyển thất bại",
        },
        {
          id: 3,
          shippingTime: "20/10/2023",
          weight: 300,
          price: 300000,
          status: "Chuyển thành công",
        },
        {
          id: 4,
          shippingTime: "20/10/2023",
          weight: 300,
          price: 300000,
          status: "Nhận từ điểm tập kết",
        },
      ],
      headers: [
        {
          title: "ID",
          align: "start",
          sortable: false,
          key: "id",
        },
        { title: "Thời gian gửi", key: "shippingTime", align: "center" },
        { title: "Khối lượng (g)", key: "weight", align: "center" },
        { title: "Giá", key: "price", align: "center" },
        { title: "Trạng thái đơn hàng", key: "status", align: "center" },
      ],
    };
  },

  methods: {
    getColor(status) {
      if (status === "Chuyển thành công") return "green";
      else if (status === "Chuyển thất bại") return "red";
      else return "orange";
    },
  },
};
</script>
