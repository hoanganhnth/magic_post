<template>
    <div class="collection-list">
      <h1>Danh sách điểm tập kết</h1>
      <h3 class="api-title">TestAPI</h3>
      <div v-if="collections_point.length === 0" class="loading-indicator">Đang tải...</div>
      <ul v-else>
        <li v-for="collection in collections_point" :key="collection.id">
          {{ `${collection.name} - Địa chỉ: ${collection.address}` }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
 
  
  export default {
    components: {  },
    data() {
      return {
        collections_point: [],
      };
    },
    async created() {
      try {
        // Sử dụng async/await để xử lý request API
        const response = await axios.get('https://65361260c620ba9358ecf36a.mockapi.io/data/api/v1/data');
        this.collections_point = response.data;
        console.log(this.collections_point);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    },
    methods: {
      // Các phương thức khác
    }
  };
  </script>
  <style scoped>
  .loading-indicator {
    font-style: italic;
    color: #888;
  }
  .collection-list {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .api-title {
    color: red;
  }
  </style>
  