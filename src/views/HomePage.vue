<!-- HomePage.vue -->

<template>
  <page-header></page-header>

  <div class="container">
    <div class="image-container">
      <img id="main-image"
        src="../images/bg2.png"
        alt="Main Image">
    </div>
  </div>
  <page-footer></page-footer>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import PageFooter from '@/components/PageFooter.vue';

export default {
  components: { PageHeader, PageFooter },
  data() {
    return {
    };
  },

};
</script>

<style scoped>

.container {
  max-width: 100%;

  text-align: center;
}



#main-image {
  width: 100%;

}
</style>
