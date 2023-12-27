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
  props: {
    loadData: Boolean,
    items: Object,
  },
  watch: {
    
  },
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
        { title: "Thời gian gửi", key: "shippingTime", align: "center" },
        { title: "Khối lượng (g)", key: "weight", align: "center" },
        { title: "Giá", key: "price", align: "center" },
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
    items() {
      this.loading = this.loadData;
      // Cập nhật lại bảng khi items thay đổi
      this.$forceUpdate();
    },
  },

  methods: {
    initialize() {
      this.items = this.shipments;
    },
    getColor(status) {
      if (status === "Chuyển thành công") return "green";
      else if (status === "Chuyển thất bại") return "red";
      else return "orange";
    },
  },
};
</script>
