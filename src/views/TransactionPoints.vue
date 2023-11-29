<template>
  <page-header></page-header>
  <collection-points></collection-points>
  <div class="transaction-list">
    <h1>Danh sách điểm giao dịch</h1>
    <h3 class="api-title">TestAPI</h3>
    <div v-if="transactions_point.length === 0" class="loading-indicator">Đang tải...</div>
    <ul v-else>
      <li v-for="transaction in transactions_point" :key="transaction.id">
        {{ `${transaction.name} - Địa chỉ: ${transaction.address}` }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
import PageHeader from '@/components/PageHeader.vue';
import CollectionPoints from '@/components/CollectionPoints.vue';

export default {
  components: { PageHeader, CollectionPoints },
  data() {
    return {
      transactions_point: [],
    };
  },
  async created() {
    try {
      // Sử dụng async/await để xử lý request API
      const response = await axios.get('https://65361260c620ba9358ecf36a.mockapi.io/data/api/v1/user');
      this.transactions_point = response.data;
      console.log(this.transactions_point);
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
.transaction-list {
  max-width: 600px;
  margin: 0 auto;
}

.api-title {
  color: red;
}
</style>
