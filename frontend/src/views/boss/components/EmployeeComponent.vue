<template>
    <v-container>
      <v-data-table
        :headers="headers"
        :items="employees"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Quản lý Nhân viên</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark v-on="on">Thêm Nhân viên</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="editedItem.name" label="Họ và tên"></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field v-model="editedItem.position" label="Chức vụ"></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="closeDialog">Hủy</v-btn>
                  <v-btn @click="save">Lưu</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <!-- Sử dụng v-slot với tên slot được xác định trong headers -->
        <template v-slot:[`header.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        employees: [
          { id: 1, name: 'Nguyen Van A', position: 'Developer' },
          { id: 2, name: 'Tran Thi B', position: 'Designer' },
          // Thêm dữ liệu nhân viên khác nếu cần
        ],
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Họ và tên', value: 'name' },
          { text: 'Chức vụ', value: 'position' },
          { text: 'Thao tác', value: 'actions', sortable: false },
        ],
        editedIndex: -1,
        editedItem: {
          name: '',
          position: '',
        },
        dialog: false,
      };
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Thêm Nhân viên' : 'Sửa Nhân viên';
      },
    },
    methods: {
      editItem(item) {
        this.editedIndex = this.employees.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },
      deleteItem(item) {
        const index = this.employees.indexOf(item);
        if (confirm('Bạn có chắc chắn muốn xóa Nhân viên này không?')) {
          this.employees.splice(index, 1);
        }
      },
      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.employees[this.editedIndex], this.editedItem);
        } else {
          this.employees.push(Object.assign({}, this.editedItem));
        }
        this.closeDialog();
      },
      closeDialog() {
        this.dialog = false;
        this.editedItem = {
          name: '',
          position: '',
        };
        this.editedIndex = -1;
      },
    },
  };
  </script>
  