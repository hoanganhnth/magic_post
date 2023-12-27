<template>
  <v-card>
    <v-card-title>Thống kê hàng hóa</v-card-title>

    <v-data-table :loading="loadData" :items="items" :headers="headers">
      <template v-slot:[`items.status`]="{ value }">
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
  props: {
    shipments: {
      type: Array,
      required: true,
    },
    loadData: Boolean,
  },

  created() {
    this.initialize();
  },
  watch: {
    shipments(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initialize();
        this.loading = this.loadData;
        // this.$forceUpdate();
      }
    },
  },

  methods: {
    initialize() {
      this.items = this.shipments;
      console.log(this.items);
    },
    getColor(status) {
      if (status === "Chuyển thành công") return "green";
      else if (status === "Chuyển thất bại") return "red";
      else return "orange";
    },
  },
};
</script>
