<template>
  <v-card>
    <v-card-title>Đơn hàng cần xử lý</v-card-title>

    <v-data-table :loading="loadData" :items="shipments" :headers="headers">
      <template v-slot:[`item.add`]="{ item }">
        <div>
          <div v-if="item.status === 'Preparing' || item.status === 'Cancel'">
            <v-btn class="button" @click="addItemCollection(item)">
              Chuyển đơn hàng đến điểm tập kết
            </v-btn>
          </div>
          <div v-if="item.status === 'ArrivedDestinationToU'">
            <v-btn class="button" @click="addItem(item)">
              Chuyển đơn hàng đến người nhận
            </v-btn>
          </div>
        </div>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div>
          <div v-if="item.status === 'Preparing'">
            <v-icon
              color="red"
              size="small"
              class="me-2"
              @click="deleteOrder(item)"
            >
              <i class="far fa-trash-alt"></i
            ></v-icon>
          </div>
          <div v-if="item.status !== 'Preparing'">
            <v-icon size="small" class="me-2-off">
              <i class="far fa-trash-alt"></i
            ></v-icon>
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
              điểm tập kết
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
    <template>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Xóa đơn hàng</span>
          </v-card-title>

          <v-card-text>
            <p>Bạn có muốn xóa đơn hàng này không</p>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue-darken-1" variant="text" @click="close">
              Thoát
            </v-btn>
            <v-btn color="blue-darken-1" variant="text" @click="saveDelete">
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
      dialog: false,
      dialogCollection: false,
      dialogDelete: false,
      itemDelete: null,
      loading: false,
      items: [],
      itemEdit: {
        id: "",
        created_at: "",
        goods_weight: "",
        status: "",
      },
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
        { title: "Hành động", key: "actions", sortable: false },
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
      this.dialogDelete = false;
    },
    saveDelete() {
      this.dialogDelete = false;
      this.$emit("addOrder", this.itemDelete);
    },
    deleteOrder() {
      this.dialogDelete = true;
      this.$emit("addOrder", this.itemDelete);
    },
    save() {
      this.dialog = false;
      this.$emit("addOrder", this.itemDelete);
    },
    async saveCollection() {},
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
      this.itemDelete = item;
      console.log(item);
    },
    async addItemCollection(item) {
      this.dialogCollection = false;
      this.itemEdit = item;
      this.itemDelete = item;
      try {
        const res1 = await StaffService.createShipmentFromTPToCP(
          this.itemDelete.id
        );
        console.log(res1);
        if (res1.error_code === 0) {
          console.log(res1.data);
          this.$emit("addOrder", this.itemDelete);
          console.log("ok");
          //xóa cái cũ ở đây
        }
        this.dialogCollection = false;
      } catch (error) {
        console.error(error);
      }
    },
    addOrder(itemDelete) {
      this.$emit("addOrder", itemDelete);
      console.log(itemDelete);
    },
  },
};
</script>
<style scoped>
.me-2-off {
  color: gray;
}
</style>
