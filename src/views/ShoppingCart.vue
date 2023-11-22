<!-- Cart.vue -->
<template>
  <page-header></page-header>
  <div>
    <h2>Shopping Cart</h2>
    <div class="container">
      <ul class="list-product">
        <li class="product">Hello</li>
        <li class="product">World</li>
        <li class="product">Kitty</li>
        <li class="product">ABC</li>
        <li class="product">Doan</li>
        <li class="product">CDE</li>
      </ul>
    </div>
    <!-- Display the items in the shopping cart and total price here -->
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'

export default {
  components: { PageHeader },
  name: 'ShoppingCart',
  // Add component logic here if needed
}
</script>

<style scoped>
/* .container {
  display: flex;
  padding: 10px;
  margin: 10px;

} */
ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
    }

    li {
      width: 300px; /* Độ rộng của mỗi cột */
      margin: 10px;
      border: 1px solid #ddd;
      padding: 10px;
      text-align: center;
    }
/* Add component-specific styles here */
</style>
