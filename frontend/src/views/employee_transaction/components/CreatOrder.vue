<template>
  <v-card>
    <v-card-title>Đơn hàng cần xử lý</v-card-title>

    <v-data-table :loading="loadData" :items="items" :headers="headers">
      <template v-slot:[`item.status`]="{ value }">
        <v-chip :color="getColor(value)"> {{ value }} </v-chip>
      </template>
      <template v-slot:[`item.add`]="{ item }">
        <div>
          <div v-if="item.status === 'Preparing'">
            <v-btn class="button" @click="addItemCollection(item)">
              Chuyển đơn hàng đến điểm tập kết
            </v-btn>
          </div>
          <div v-if="item.status === 'Nhận từ điểm tập kết'">
            <v-btn class="button" @click="addItem(item)">
              Chuyển đơn hàng đến người nhận
            </v-btn>
          </div>
        </div>
      </template>
    </v-data-table>
    <template>
      <v-dialog v-model="dialogCollection" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Chuyển đơn hàng đến điểm tập kết</span>
          </v-card-title>

          <v-card-text>
            <p>
              Bạn có chắc chắn muốn thêm đơn hàng này vào danh sách chuyển đến
              tập kết
            </p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="close">
              Thoát
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveCollection">
              Đổng ý
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template>
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Chuyển đơn hàng đến người nhận</span>
          </v-card-title>

          <v-card-text>
            <p>
              Bạn có chắc chắn muốn thêm đơn hàng này vào danh sách chuyển đến
              người nhận
            </p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="close">
              Thoát
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="save">
              Đổng ý
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </v-card>
</template>

<script>
import { StaffService } from "../../../service/StaffService";
export default {
  name: "CreatOrder",
  data() {
    return {
      collectionPoint: ["Ha Noi", "Da Nang"],
      selectedCollectionPoint: null,
      dialog: false,
      dialogCollection: false,
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
        { title: "Thêm đơn hàng chuyển đến", key: "add", sortable: false },
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
    close() {
      this.dialog = false;
      this.dialogCollection = false;
    },
    save() {
      this.dialog = false;
    },
    async saveCollection() {
      this.dialogCollection = false;
      console.log("ok");
      const id = "";
      try {
        const res1 = await StaffService.createShipmentFromTPToCP(id);
        if (res1.error_code === 0) {
          console.log(res1.message);
          //xóa cái cũ ở đây
        }
      } catch (error) {
        console.error(error);
      }
    },
    initialize() {
      this.items = this.shipments;
    },
    getColor(status) {
      if (status === "Nhận từ điểm tập kết") return "green";
      else if (status === "Chuyển thất bại") return "red";
      else return "orange";
    },
    addItem(item) {
      this.dialog = true;
      console.log(item);
    },
    addItemCollection(item) {
      this.dialogCollection = true;
      console.log(item);
    },
    addOrder(itemDelete) {
      this.$emit("addOrder", itemDelete);
      console.log(itemDelete);
    },
  },
};
</script>
