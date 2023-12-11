<!-- HomePage.vue -->

<template>
    <div>
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
    <div class="container-fluid pt-5">
        <div class="container">
            <div class="text-center pb-2">
                <h6 class="text-primary text-uppercase font-weight-bold">Dịch vụ của chúng tôi</h6>
                <h1 class="mb-4">Cung cấp dịch vụ tốt nhất cho người dùng</h1>
            </div>
            <div class="row pb-3">
                <div class="col-lg-3 col-md-6 text-center mb-5">
                    <div class="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                        <i class="fa fa-2x fa-plane text-dark pr-3"></i>
                        <h6 class="text-white font-weight-medium m-0">Đường hàng không</h6>
                    </div>
                    <a class="border-bottom text-decoration-none" href="">Tìm hiểu thêm</a>
                </div>
                <div class="col-lg-3 col-md-6 text-center mb-5">
                    <div class="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                        <i class="fa fa-2x fa-ship text-dark pr-3"></i>
                        <h6 class="text-white font-weight-medium m-0">Đường biển</h6>
                    </div>
             
                    <a class="border-bottom text-decoration-none" href="">Tìm hiểu thêm</a>
                </div>
                <div class="col-lg-3 col-md-6 text-center mb-5">
                    <div class="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                        <i class="fa fa-2x fa-truck text-dark pr-3"></i>
                        <h6 class="text-white font-weight-medium m-0">Đường bộ</h6>
                    </div>
                    
                    <a class="border-bottom text-decoration-none" href="">Tìm hiểu thêm</a>
                </div>
                <div class="col-lg-3 col-md-6 text-center mb-5">
                    <div class="d-flex align-items-center justify-content-center bg-primary mb-4 p-4">
                        <i class="fa fa-2x fa-store text-dark pr-3"></i>
                        <h6 class="text-white font-weight-medium m-0">Lưu trữ hàng hóa</h6>
                    </div>
                
                    <a class="border-bottom text-decoration-none" href="">Tìm hiểu thêm</a>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid bg-secondary my-5">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-5">
                    <img class="img-fluid w-100" src="../images/feature.jpg" alt="">
                </div>
                <div class="col-lg-7 py-5 py-lg-0">
                    <h6 class="text-primary text-uppercase font-weight-bold">Tại sao nên chọn MagicPost</h6>
                    <h1 class="mb-4">Nhanh, an toàn và thủ tục đơn giản</h1>

                    <ul class="list-inline">
                        <li><h6><i class="far fa-dot-circle text-primary mr-3"></i>Giá thành hợp lý</h6></li>
                        <li><h6><i class="far fa-dot-circle text-primary mr-3"></i>Dịch vụ chuyên nghiệp</h6></li>
                        <li><h6><i class="far fa-dot-circle text-primary mr-3"></i>Làm việc 27/7</h6></li>
                    </ul>
                    <a href="" class="btn btn-primary mt-3 py-2 px-4">Tìm hiểu thêm</a>
                </div>
            </div>
        </div>
    </div>
  <page-footer></page-footer>
</div>
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
.container-fluid {
  background-color: #f8fbfd;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

</style>
