<!-- HomePage.vue -->

<template>
  <page-header></page-header>

  <div class="jumbotron jumbotron-fluid mb-5">
        <div class="container text-center py-5">
            <h1 class="text-primary mb-4">Nhanh chóng An toàn</h1>
            <h1 class="text-white display-3 mb-5" style="font-weight: 800;">MagicPost</h1>
            <div class="mx-auto" style="width: 100%; max-width: 600px;">
                <div class="input-group">
                    <input type="text" class="form-control border-light" style="padding: 30px;" placeholder="Nhập ID đơn hàng">
                    <div class="input-group-append">
                        <button class="btn btn-primary px-3">Tra cứu</button>
                    </div>
                </div>
            </div>
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
.jumbotron {
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(../images/header.jpg);
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
.jumbotron {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
}

@media (min-width: 576px) {
  .jumbotron {
    padding: 4rem 2rem;
  }
}

.jumbotron-fluid {
  padding-right: 0;
  padding-left: 0;
}

</style>
