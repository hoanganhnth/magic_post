<template>
    <Bar 
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'Chart',
    components: { Bar },
    data() {
      return {
        chartData: {
          labels: [ 'Tháng 1', 'Tháng 2', 'Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12' ],
          datasets: [
          {
            label: 'Đơn hàng',
            backgroundColor: '#0087C2',
            data: [400, 200, 120,101,202,105,120,320,120,110,300,120],
        
          }
        ]
          
    
        },
        chartOptions: {
          responsive: true,
          plugins: {
          title: {
            display: true,
            text: 'Biểu đồ Tổng số đơn hàng trong năm 2023', // Tên của biểu đồ
            font: {
                family:  'Arial Narrow Bold',
                size: 27
                    }
          },
        },
        }
      }
    },

  }
  </script>
  <style scoped>
 #my-chart-id {
    padding-bottom: 50px;
    
 }
  </style>