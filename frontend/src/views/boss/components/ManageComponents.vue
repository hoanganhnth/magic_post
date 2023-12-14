<template>
  <v-container>
    <v-row>
      <!-- Quản lý điểm tập kết -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Quản lý điểm Tập kết</v-card-title>
          <v-card-text>
            <v-data-table :loading="loading" :items="collectionPoints" :headers="collectionHeaders"
              :items-per-page="5"></v-data-table>
            <v-btn @click="showCollectionDialog = true" color="primary">Thêm điểm tập kết</v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Quản lý điểm giao dịch -->
      <v-col cols="12">
        <v-card>
          <v-card-title>Quản lý điểm Giao dịch</v-card-title>
          <v-card-text>
            <v-data-table :loading="loading" :items="transactionPoints" :headers="transactionHeaders"
              :items-per-page="5"></v-data-table>
            <v-btn @click="showTransactionDialog = true" color="primary">Thêm điểm giao dịch</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog để thêm điểm giao dịch -->
    <v-dialog v-model="showTransactionDialog" max-width="600px">
      <v-card>
        <v-card-title>Thêm điểm giao dịch</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addTransactionPoint">
            <v-text-field v-model="newTransactionPoint.name_transaction" label="Tên điểm giao dịch"></v-text-field>
            <v-text-field v-model="newTransactionPoint.address" label="Địa chỉ"></v-text-field>
            <v-text-field v-model="newTransactionPoint.collection" label="Thuộc điểm tập kết"></v-text-field>
            <v-text-field v-model="newTransactionPoint.email" label="Tài khoản quản lý"></v-text-field>
            <!-- Các trường thông tin khác nếu cần -->

            <v-btn type="submit" color="primary">Lưu</v-btn>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showTransactionDialog = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog để thêm điểm tập kết -->
    <v-dialog v-model="showCollectionDialog" max-width="600px">
      <v-card>
        <v-card-title>Thêm điểm tập kết</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="addCollectionPoint">
            <v-text-field v-model="newCollectionPoint.name_collection" label="Tên điểm tập kết"></v-text-field>
            <v-text-field v-model="newCollectionPoint.address" label="Địa chỉ"></v-text-field>
            <v-text-field v-model="newCollectionPoint.email" label="Tài khoản quản lý"></v-text-field>
            <!-- Các trường thông tin khác nếu cần -->

            <v-btn type="submit" color="primary">Lưu</v-btn>

          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="showCollectionDialog = false">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showTransactionDialog: false,
      showCollectionDialog: false,
      newTransactionPoint: {
        id: 10,
        name_transaction: '',
        collection: '',
        orders: 0,
        address: '',
        email: ''
      },
      newCollectionPoint: {
        id: 12,
        name_collection: '',
        address: '',
        email: ''
      },
      // ... (các dữ liệu và thuộc tính khác)
      transactionPoints: [
        {
          id: 1,
          name_transaction: 'Điểm giao dịch A',
          address: '144 Xuân Thủy',
          collection: 'Hà Nội',
          orders: 350,
          email: "test1@gmail.com",
        },
        {
          id: 2,
          name_transaction: 'Điểm giao dịch A',
          address: '144 Xuân Thủy',
          collection: 'Hà Nội',
          orders: 350,
          email: "test1@gmail.com",
        },
        {
          id: 3,
          name_transaction: 'Điểm giao dịch A',
          address: '144 Xuân Thủy',
          collection: 'Hà Nội',
          orders: 350,
          email: "test1@gmail.com",
        },
        {
          id: 4,
          name_transaction: 'Điểm giao dịch A',
          address: '144 Xuân Thủy',
          collection: 'Hà Nội',
          orders: 350,
          email: "test1@gmail.com",
        },

      ],
      transactionHeaders: [
        {
          title: 'ID',
          align: 'start',
          sortable: false,
          key: 'id',
        },
        { title: 'Tên điểm giao dịch', key: 'name_transaction', align: 'end' },
        { title: 'Địa chỉ', key: 'address', align: 'end' },
        { title: 'Thuộc điểm tập kết', key: 'collection', align: 'end' },
        { title: 'Tổng số đơn hàng', key: 'orders', align: 'end' },
        { title: 'Tài khoản quản lý', key: 'email', align: 'end' },
      ],

      collectionHeaders: [
        {
          title: 'ID',
          align: 'start',
          sortable: false,
          key: 'id',
        },
        { title: 'Tên điểm tập kết', key: 'name_collection', align: 'end' },
        { title: 'Địa chỉ', key: 'address', align: 'end' },
        { title: 'Tổng số đơn hàng', key: 'orders', align: 'end' },
        { title: 'Tài khoản quản lý', key: 'email', align: 'end' },
      ],
      collectionPoints: [
        {
          id: 1,
          name_collection: 'Điểm giao dịch A',
          address: '144 Xuân Thủy',
          orders: 350,
          email: "test1@gmail.com",
        },
        {
          id: 2,
          name_collection: 'Điểm giao dịch A',
          address: '144 Xuân Thủy',
          orders: 350,
          email: "test2@gmail.com",
        },
        {
          id: 3,
          name_collection: 'Điểm giao dịch A',
          address: '144 Xuân Thủy',
          orders: 350,
          email: "test3@gmail.com",
        },
      ],
      loading: false,
    };
  },

  methods: {
    addTransactionPoint() {
      this.loading = true;
      this.newTransactionPoint.id = this.transactionPoints.length + 1;
      this.transactionPoints.push({ ...this.newTransactionPoint });
      this.showTransactionDialog = false;
      this.loading = false;
      // Có thể thêm logic xử lý khác nếu cần
    },
    addCollectionPoint() {
      this.loading = true;
      this.newCollectionPoint.id = this.collectionPoints.length + 1
      this.collectionPoints.push({ ...this.newCollectionPoint });
      this.showCollectionDialog = false;
      this.loading = false
      // Có thể thêm logic xử lý khác nếu cần
    },
  },
};
</script>
<style scoped></style>
  