<template>
   
        <v-card>
          <v-card-title>Quản lý tài khoản trưởng điểm Tập kết</v-card-title>
  
          <v-card-text>
          
  
            <v-row>
              <v-col cols="12">
                <v-data-table :headers="headers" :items="list_employee" >
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
                                  <v-text-field v-model="editedItem.id" label="ID"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.name" label="Tên trưởng điểm"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.collection" label="Điểm quản lý"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="4">
                                  <v-text-field v-model="editedItem.phone" label="Số điện thoại"></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-card-text>
  
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="close">
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
                          <v-card-title class="text-h6">Bạn có muốn xóa tài khoản này</v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Thoát</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-toolbar>
                  </template>
                  <template v-slot:[`item.actions`]="{ item }">
          
  
  
                    <v-icon size="small" class="me-2" @click="editItem(item)" >
                      <i class="far fa-edit"></i></v-icon>
                    <v-icon size="small" @click="deleteItem(item)" >
                      <i class="far fa-trash-alt"></i></v-icon>
                  </template>
                  <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">
                      Reset
                    </v-btn>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
  
          </v-card-text>
        </v-card>
      
  </template>
  
    
  <script>
  
  export default {
    
  
    name: "EmployeeCollection",
    data: () => ({
      type : null,
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          title: 'ID',
          align: 'start',
          sortable: false,
          key: 'id',
        },
        { title: 'Tên trưởng điểm', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Điểm quản lý', key: 'collection' },
        { title: 'Số điện thoại', key: 'phone' },
        { title: 'Actions', key: 'actions', sortable: false },
      ],
      list_employee: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        name: "",
        email: "",
        collection: "",
        phone: "",
      },
      defaultItem: {
        id: 0,
        name: "",
        email: "",
        collection: "",
        phone: "",
      },
    }),
  
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },
  
    watch: {
      dialog(val) {
        val || this.close()
      },
      dialogDelete(val) {
        val || this.closeDelete()
      },
    },
  
    created() {
      this.initialize()
    },
  
    methods: {
      initialize(type) {
       
       
        this.list_employee = [
          {
            id: 1,
        name: "doan",
        email: "test@gmail.com",
        collection: "Hà Nội",
        phone: "0912231223",
          },
          {
            id: 2,
        name: "duong",
        email: "test1@gmail.com",
        collection: "Đà Nẵng",
        phone: "0912231223",
          },
          {
            id: 3,
        name: "H.anh",
        email: "test3@gmail.com",
        collection: "TP. HCM",
        phone: "0912231223",
          },
        ]
        
          
        
      },
  
      editItem(item) {
        this.editedIndex = this.list_employee.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
  
      deleteItem(item) {
        this.editedIndex = this.list_employee.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
  
      deleteItemConfirm() {
        this.list_employee.splice(this.editedIndex, 1)
        this.closeDelete()
      },
  
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
  
      closeDelete() {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
  
      save() {
        if (this.editedIndex > -1) {
          Object.assign(this.list_employee[this.editedIndex], this.editedItem)
        } else {
          this.list_employee.push(this.editedItem)
        }
        this.close()
      },
    },
  }
  </script>