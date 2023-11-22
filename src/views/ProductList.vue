<template>
  <page-header></page-header>
  <div>
    <h2>Product List</h2>
    <ul>
      <li v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
export default {
  components: { PageHeader },
  name: 'ProductList',
  data() {
    return {
      products: [
        { id: 1, name: 'Product A' },
        { id: 2, name: 'Product B' },
        { id: 3, name: 'Product C' },
        { id: 4, name: 'Product D' },
        // Thêm các sản phẩm khác tại đây
      ]
    };
  }
}
</script>

<style scoped>
ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
    }

    li {
      flex: 1 0 auto;
    
      margin: 10px;
      border: 1px solid #361d1d;
      padding: 10px;
      text-align: center;
      background-color: rgb(228, 196, 135);
    }
/* Add component-specific styles here */
</style>
