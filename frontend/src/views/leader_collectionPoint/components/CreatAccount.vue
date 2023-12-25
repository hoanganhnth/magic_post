<template>
  <v-card>
    <v-card-title>Danh sách tài khoản nhân viên</v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="list_employee">
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Thông tin nhân viên</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ props }">
                    <v-btn color="primary" dark class="mb-2" v-bind="props">
                      Tạo tài khoản
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.first_name"
                              label="First name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.last_name"
                              label="Last name"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.email"
                              label="Email"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12" sm="6" md="4">
                            <v-text-field
                              v-model="editedItem.numberPhone"
                              label="Số điện thoại"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="close"
                      >
                        Thoát
                      </v-btn>
                      <v-btn color="blue-darken-1" variant="text" @click="save">
                        Lưu
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h6"
                      >Bạn có muốn xóa tài khoản này</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="closeDelete"
                        >Thoát</v-btn
                      >
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon size="small" class="me-2" @click="editItem(item)">
                <i class="far fa-edit"></i
              ></v-icon>
              <v-icon size="small" @click="deleteItem(item)">
                <i class="far fa-trash-alt"></i
              ></v-icon>
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
import { StaffService } from "../../../service/StaffService";
export default {
  name: "CreatAccount",
  data: () => ({
    type: null,
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "ID",
        align: "start",
        sortable: false,
        key: "id",
      },
      { title: "Tên tài khoản", key: "username" },
      { title: "Email", key: "email" },
      { title: "Số điện thoại", key: "numberPhone" },
      { title: "Hành động", key: "actions", sortable: false },
    ],
    list_employee: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      permission: "",
      numberPhone: "",
    },
    defaultItem: {
      id: "",
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      permission: "",
      numberPhone: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    collectionStaffs(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initialize();
      }
    },
  },
  props: {
    collectionStaffs: {
      type: Array,
      required: true,
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.list_employee = this.collectionStaffs;
    },

    editItem(item) {
      this.editedIndex = this.list_employee.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.list_employee.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        const userId = this.employeeCollection[this.editedIndex].id;

        const data = await StaffService.deleteStaff(userId);
        if (data.error_code === 0) {
          this.list_employee.splice(this.editedIndex, 1);
          this.closeDelete();
          console.log(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.list_employee[this.editedIndex], this.editedItem);
      } else {
        try {
          console.log(this.editedItem);
          const res = await StaffService.registerStaff(this.editedItem);

          if (res.error_code === 0) {
            console.log(res.data.username, res.data.password);
            this.editedItem.id = res.data.id;
            this.editedItem.username = res.data.username;
            this.editedItem.permission = localStorage.getItem("permission");
            this.list_employee.push(this.editedItem);
          }
        } catch (error) {
          console.error(error);
        }
      }
      this.close();
    },
  },
};
</script>
