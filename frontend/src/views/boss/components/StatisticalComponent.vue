<template>
  <v-app>
    <v-main>
      <v-card>
        <v-card-title>Thống kê hàng hóa</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-form>
                <v-row>
                  <v-col cols="6">
                    <v-text-field v-model="fromDate" label="Từ ngày" type="date"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field v-model="toDate" label="Đến ngày" type="date"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-select v-model="selectedCollectionPoint" :items="colletions" label="Điểm tập kết"
                      item-title="state"></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <v-select v-model="selectedTransactionPoint" :items="transactions" label="Điểm giao dịch"
                      item-title="state"></v-select>
                  </v-col>
                </v-row>

                
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="getData">Lấy dữ liệu</v-btn>
        </v-card-actions>


        <v-data-table :loading="loading" :items="items" :headers="headers">

        </v-data-table>

      </v-card>
    </v-main>
  </v-app>
</template>


<script >

export default {
  watch: {
    selectedCollectionPoint: function (newCollectionPoint) {
      // Lưu ý: Bạn có thể cần thay đổi logic dưới đây để phản ánh các yêu cầu của bạn
      this.updateTransactions(newCollectionPoint);
    },
  },

  name: 'StatisticalComponent',
  data() {
    return {
      selectedTransactionPoint: null, // 2 bien nay luu gia tri diem giao dich+ diem tap ket da chon trong form
      selectedCollectionPoint: null,
      fromDate: new Date().toISOString().substr(0, 10), // Giá trị mặc định là ngày hôm nay
      toDate: new Date().toISOString().substr(0, 10), // Giá trị mặc định là ngày hôm nay
      loading: false,
     // bien collections luu cac diem tapj ket
      colletions: [
        { id: 1, state: 'Hà Nội' },
        { id: 2, state: 'Hải Phòng' },
        { id: 3, state: 'Đà Nẵng' },
        { id: 4, state: 'TP HCM' },
      ],
// bien transactions ten cac diem giao dich thuoc diem tap ket da chon
      transactions: [
        
        ],
        // bien items luu thong tin don hang
      items: [
        {
          id: 1,
          pointOfSale: 'Điểm giao dịch A',
          shippingTime: '2 ngày',
          estimatedReceivedTime: '4 ngày',
          weight: 100,
          price: 100000,
        },
        {
          id: 2,
          pointOfSale: 'Điểm giao dịch B',
          shippingTime: '3 ngày',
          estimatedReceivedTime: '6 ngày',
          weight: 200,
          price: 200000,
        },
        {
          id: 3,
          pointOfSale: 'Điểm giao dịch C',
          shippingTime: '4 ngày',
          estimatedReceivedTime: '8 ngày',
          weight: 300,
          price: 300000,
        },
      ],
      headers: [
        {
          title: 'ID',
          align: 'start',
          sortable: false,
          key: 'id',
        },
        { title: 'Điểm giao dịch', key: 'pointOfSale', align: 'end' },
        { title: 'Thời gian gửi', key: 'shippingTime', align: 'end' },
        { title: 'Thời gian tối đa', key: 'estimatedReceivedTime', align: 'end' },
        { title: 'Khối lượng (g)', key: 'weight', align: 'end' },
        { title: 'Giá', key: 'price', align: 'end' },
      ],


      loading: false,
    };
  },

  methods: {
    getData() {
      this.loading = true;
    

      // Lấy thông tin từ điểm tập kết đã chọn
      if (this.selectedTransactionPoint) {

        if (this.selectedTransactionPoint == 'Cầu Giấy')
          this.items = [
            {
              id: 1,
              pointOfSale: '144 Xuân Thủy',
              shippingTime: '2 ngày',
              estimatedReceivedTime: '4 ngày',
              weight: 200,
              price: 100000,
            },
            {
              id: 2,
              pointOfSale: '75 Hồ Tùng Mậu',
              shippingTime: '3 ngày',
              estimatedReceivedTime: '6 ngày',
              weight: 200,
              price: 200000,
            },
            {
              id: 3,
              pointOfSale: '123 Trần Duy Hưng',
              shippingTime: '4 ngày',
              estimatedReceivedTime: '8 ngày',
              weight: 300,
              price: 300000,
            },
          ]
            ;
        // Thực hiện các thao tác khác với thông tin đã lấy
      }


     
      this.loading = false;
    },
    updateTransactions(selectedCollectionPoint) {       // hàm này sẽ cập nhật giá trị của các điểm giao dịch thuộc điểm tập kết đã chọn
      if (selectedCollectionPoint === 'Hà Nội') {
        this.transactions = [
          {
            id: 1,
            state: 'Cầu Giấy',
          },
          {
            id: 2,
            state: 'Hoàng Mai',
          },
          // Thêm các điểm giao dịch khác nếu cần
        ];
      } else if (selectedCollectionPoint === 'Hải Phòng') {
        this.transactions = [
          {
            id: 1,
            state: 'TP Hải Phòng',
          },
          {
            id: 2,
            state: 'Cát Bà',
          },
          // Thêm các điểm giao dịch khác nếu cần
        ];
        // Thêm logic xử lý cho điểm tập kết Hải Phòng
      }
     else if (selectedCollectionPoint === 'Đà Nẵng') {
        this.transactions = [
          {
            id: 1,
            state: 'TP Đà Nẵng',
          },
          {
            id: 2,
            state: 'ABCD',
          },
          // Thêm các điểm giao dịch khác nếu cần
        ];
        // Thêm logic xử lý cho điểm tập kết Hải Phòng
      }
      else {
        this.transactions = [
        {
            id: 1,
            state: 'Quan 1',
          },
          {
            id: 2,
            state: 'Quan 7',
          },
          // Thêm các điểm giao dịch khác nếu cần
        ];
      }

      // Các điều kiện khác cho các điểm tập kết khác
    },
  
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString('vi-VN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }) : '';
    },
  },
};
</script>
<style scoped>
span {
  color: black;
}
</style>


