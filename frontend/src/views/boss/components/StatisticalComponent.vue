<template>
    <v-app>
      <v-container>
        <v-card>
          <v-card-title>
            Thống kê hàng gửi, hàng nhận
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="type"
              label="Loại thống kê"
              :items="['Thống kê toàn quốc', 'Thống kê theo điểm giao dịch', 'Thống kê theo điểm tập kết']"
            ></v-select>
            <v-data-table
              :headers="headers"
              :items="formattedItems"
            ></v-data-table>
          </v-card-text>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: 'StatisticalComponent',
    data() {
      return {
        type: 'Thống kê toàn quốc',
        headers: [
          {
            label: 'Tên điểm giao dịch hoặc điểm tập kết',
            key: 'name',
            color: 'black',
          },
          {
            label: 'Số lượng hàng gửi',
            key: 'sent_quantity',
            color: 'black',
          },
          {
            label: 'Số lượng hàng nhận',
            key: 'received_quantity',
            color: 'black',
          },
        ],
        items: [
          {
            name: 'Hà Nội',
            sent_quantity: 10000,
            received_quantity: 5000,
          },
          {
            name: 'TP. Hồ Chí Minh',
            sent_quantity: 5000,
            received_quantity: 2500,
          },
        ],
      };
    },
    computed: {
      formattedItems() {
        return this.items.map(item => ({
          ...item,
          sent_quantity: this.formatNumber(item.sent_quantity),
          received_quantity: this.formatNumber(item.received_quantity),
        }));
      },
    },
    methods: {
      formatNumber(value) {
        // Hàm định dạng số theo nhu cầu của bạn
        // Ví dụ: 
        return new Intl.NumberFormat().format(value);
      },
    },
  };
  </script>
  
  <style scoped>
  * {
    color: black;
    
  }
  </style>
  