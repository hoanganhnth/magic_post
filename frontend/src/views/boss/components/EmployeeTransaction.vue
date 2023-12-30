<template>
  <v-card>
    <v-card-title>Quản lý tài khoản trưởng điểm Giao dịch</v-card-title>

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
                          <v-col cols="12" sm="12" md="6">
                            <v-select
                              v-model="selectedTransaction"
                              :items="transactionPoint"
                              label="Điểm quản lý"
                              item-title="name"
                            ></v-select>
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
                <v-dialog v-model="dialogPassword" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h6"
                      >Thông tin tài khoàn</v-card-title
                    >
                    <v-card-text>
                      <p>Tên đang nhập: {{ username }}</p>
                      <br />
                      <p>Mật khẩu: {{ password }}</p>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="blue-darken-1"
                        variant="text"
                        @click="closePass"
                        >Đóng</v-btn
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
import { LeadService } from "../../../service/LeadService";
export default {
  name: "EmployeeTransaction",
  data: () => ({
    selectedTransaction: null,
    type: null,
    dialog: false,
    dialogDelete: false,
    dialogPassword: false,
    headers: [
      {
        title: "ID",
        align: "start",
        sortable: false,
        key: "id",
      },
      { title: "Tên tài khoản", key: "username" },
      { title: "Email", key: "email" },
      { title: "Điểm quản lý", key: "permission" },
      { title: "Số điện thoại", key: "numberPhone" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    list_employee: [],
    username: "",
    password: "",
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
      password: "",
      permission: "",
      numberPhone: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Tạo tài khoản" : "Chỉnh sửa thông tin";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    employeeTransaction(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.initialize();
      }
    },
  },
  props: {
    employeeTransaction: {
      type: Array,
      required: true,
    },
    transactionPoint: {
      type: Array,
      required: true,
    },
  },
  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.list_employee = this.employeeTransaction;
    },

    editItem(item) {
      this.editedIndex = this.list_employee.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
      this.selectedTransaction = this.editedItem.permission;
    },

    deleteItem(item) {
      this.editedIndex = this.list_employee.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      try {
        const userId = this.list_employee[this.editedIndex].id;

        const data = await LeadService.deleteStaff(userId);
        if (data.error_code === 0) {
          this.list_employee.splice(this.editedIndex, 1);
          this.closeDelete();
          console.log(data.message);
        }
      } catch (error) {
        console.error(error);
      }
    },
    closePass() {
      this.dialogPassword = false;
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
      this.dialogPassword = true;
      const selectedTransaction = this.transactionPoint.find(
        (item) => item.name === this.selectedTransaction
      );
      const payload = {
        email: this.editedItem.email,
        first_name: this.editedItem.first_name,
        last_name: this.editedItem.last_name,
        role_id: "6575e40d857fbaebbe06c957",
        permission_id: selectedTransaction.id,
        numberPhone: this.editedItem.numberPhone,
      };
      if (this.editedIndex > -1) {
        try {
          payload.userId = this.editedItem.id;
          const res = await LeadService.updateHead(payload);
          if (res.error_code === 0) {
            // console.log(res.data);
            this.editedItem.permission = this.selectedTransaction;
            Object.assign(
              this.list_employee[this.editedIndex],
              this.editedItem
            );
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const res = await LeadService.createAccountHead(payload);
          if (res.error_code === 0) {
            this.password = res.data.password;
            this.username = res.data.username;
            console.log(res.data.username, res.data.password);
            this.editedItem.id = res.data.id;
            this.editedItem.username = res.data.username;
            this.editedItem.permission = this.selectedTransaction;
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
