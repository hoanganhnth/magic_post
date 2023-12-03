<!-- App.vue -->

<template>
  <div id="app">
    <!-- <page-header></page-header> -->
</div>
<router-view></router-view>
</template>

<script>
import PageHeader from './components/PageHeader.vue'

// import PageHeader from '@/components/PageHeader.vue';


export default {
  name: 'App',
  components: {
    PageHeader
   
  //  PageHeader,

  },
}
</script>

<style>


/* Add global styles here */
</style>
