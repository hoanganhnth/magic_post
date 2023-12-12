<template>
    <v-container>
      <v-row>
        <!-- Quản lý điểm giao dịch -->
        <v-col cols="6">
          <v-card>
            <v-card-title>Quản lý điểm giao dịch</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(transactionPoint, index) in transactionPoints" :key="index">
                  
                    <v-list-item-title>{{ transactionPoint.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ transactionPoint.address }}</v-list-item-subtitle>
                  
                </v-list-item>
              </v-list>
  
              <v-btn @click="showTransactionDialog = true" color="primary">Thêm điểm giao dịch</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
  
        <!-- Quản lý điểm tập kết -->
        <v-col cols="6">
          <v-card>
            <v-card-title>Quản lý điểm tập kết</v-card-title>
            <v-card-text>
              <v-list>
                <v-list-item v-for="(collectionPoint, index) in collectionPoints" :key="index">
                 
                    <v-list-item-title>{{ collectionPoint.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ collectionPoint.address }}</v-list-item-subtitle>
                  
                </v-list-item>
              </v-list>
  
              <v-btn @click="showCollectionDialog = true" color="primary">Thêm điểm tập kết</v-btn>
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
        <v-text-field v-model="newTransactionPoint.name" label="Tên điểm giao dịch"></v-text-field>
        <v-text-field v-model="newTransactionPoint.address" label="Địa chỉ"></v-text-field>
        <!-- Các trường thông tin khác nếu cần -->

        <v-btn type="submit" color="primary">Lưu</v-btn>
        <v-btn @click="showTransactionDialog = false" color="secondary">Hủy</v-btn>
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
              <v-text-field v-model="newCollectionPoint.name" label="Tên điểm tập kết"></v-text-field>
              <v-text-field v-model="newCollectionPoint.address" label="Địa chỉ"></v-text-field>
              <!-- Các trường thông tin khác nếu cần -->
  
              <v-btn type="submit" color="primary">Lưu</v-btn>
              <v-btn @click="showCollectionDialog = false" color="secondary">Hủy</v-btn>
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
    name: 'ManageComponents',
    data() {
      return {
        showTransactionDialog: false,
        showCollectionDialog: false,
        newTransactionPoint: {
          name: '',
          address: '',
        },
        newCollectionPoint: {
          name: '',
          address: '',
        },
        transactionPoints: [
          { name: 'Điểm Giao Dịch 1', address: 'Cầu giấy' },
          // Thêm các điểm giao dịch khác nếu cần
        ],
        collectionPoints: [
          { name: 'Điểm Tập Kết 1', address: 'Hà Nội' },
          // Thêm các điểm tập kết khác nếu cần
        ],
      };
    },
    methods: {
      addTransactionPoint() {
        this.transactionPoints.push({ ...this.newTransactionPoint });
        this.showTransactionDialog = false;
        // Có thể thêm logic xử lý khác nếu cần
      },
      addCollectionPoint() {
        this.collectionPoints.push({ ...this.newCollectionPoint });
        this.showCollectionDialog = false;
        // Có thể thêm logic xử lý khác nếu cần
      },
    },
  };
  </script>
  <style scoped>
  .v-card {
    margin: 20px 0;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }
  
  .v-card-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .v-list-item {
    margin: 10px 0;
  }
  
  .v-list-item-title {
    font-weight: bold;
  }
  
  .v-list-item-subtitle {
    color: #666;
  }
  
  .v-btn {
    margin-top: 20px;
    margin-right: 20px;
    
  }
  </style>
  