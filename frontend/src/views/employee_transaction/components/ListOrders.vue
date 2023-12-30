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
        { title: "Cập nhật lúc", key: "updated_at", align: "center" },
        { title: "Khối lượng (g)", key: "goods_weight", align: "center" },
        { title: "Giá", key: "fee", align: "center" },
        { title: "Trạng thái đơn hàng", key: "status", align: "center" },
      ],
    };
  },
  watch: {
    shipments(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initialize();
      }
    },
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
  methods: {
    initialize() {
      this.items = this.shipments;
    },
    getColor(status) {
      if (status === "Arrived Destination To TransactionPoint") return "purple";
      else if (status === "Canceled") return "red";
      else if (status === "Shipped from CollectionPoint") return "blue";
      else if (status === "Delivering") return "green";
      else if (status === "Arrived Destination To CollectionPoint")
        return "gray";
      else return "orange";
    },
  },
};
</script>
