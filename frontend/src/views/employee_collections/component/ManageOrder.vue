<template>
  <v-card>
    <v-card-title>Đơn hàng từ điểm tập kết</v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="list_order">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Thông tin đơn hàng</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <div>
                <div v-if="item.isConfirm">
                  <p>Đã xác nhận</p>
                </div>
                <div v-else>
                  <v-btn class="confirm" @click="onConfirm(item)">
                    Xác nhận
                  </v-btn>
                </div>
              </div>
            </template>
            <template v-slot:[`item.button`]="{ item }">
              <div>
                <div v-if="item.isAdd">
                  <p>Đã thêm đơn đến điểm giao dịch</p>
                </div>
                <div v-else>
                  <v-btn class="button" @click="addItem(item)">
                    Thêm đơn hàng đến điểm giao dịch
                  </v-btn>
                </div>
              </div>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        title: "ID",
        align: "start",
        sortable: false,
        key: "id",
      },
      { title: "Tên đơn hàng", key: "name" },
      { title: "Loại hàng", key: "type" },
      { title: "Khối lượng", key: "weight" },
      { title: "Nhận từ điểm tập kết", key: "collection" },
      { title: "Xác nhận đơn hàng", key: "actions", sortable: false },
      { title: "Thêm đơn hàng chuyển đến", key: "button", sortable: false },
    ],
    list_order: [
      {
        id: "1",
        name: "hoa don",
        type: "tai lieu",
        weight: "100g",
        collection: "Cau giay",
        isConfirm: false,
        isAdd: false,
      },
    ],
  }),

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      // this.list_employee = this.editItem;
    },
    onConfirm(item) {
      item.isConfirm = true;
    },
    addItem(item) {
      item.isAdd = true;
    },
  },
};
</script>
<style scoped>
p {
  margin-top: 15px;
  margin-bottom: 0px;
  font-size: 15px;
  font-weight: bold;
  font-style: italic;
}

.button {
  color: rgb(47, 166, 235) !important;
}

.confirm {
  color: rgb(20, 193, 135) !important;
  border: 0px !important;
}
</style>
