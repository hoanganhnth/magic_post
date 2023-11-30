<!-- Header.vue -->
<!-- Nơi bạn muốn đặt liên kết chuyển hướng, chẳng hạn trong file Header.vue -->
<template>
  <header>
    <div class="container-fluid bg-dark">
        <div class="row py-2 px-lg-5">
            <div class="col-lg-6 text-center text-lg-left mb-2 mb-lg-0">
                <div class="d-inline-flex align-items-center text-white">
                    <small><i class="fa fa-phone-alt mr-2"></i>+012 345 6789</small>
                    <small class="px-3">|</small>
                    <small><i class="fa fa-envelope mr-2"></i>info@example.com</small>
                </div>
            </div>
            <div class="col-lg-6 text-center text-lg-right">
                <div class="d-inline-flex align-items-center">
                    <a class="text-white px-2" href="">
                        <i class="fab fa-facebook-f"></i>
                    </a>
                    <a class="text-white px-2" href="">
                        <i class="fab fa-twitter"></i>
                    </a>
                    <a class="text-white px-2" href="">
                        <i class="fab fa-linkedin-in"></i>
                    </a>
                    <a class="text-white px-2" href="">
                        <i class="fab fa-instagram"></i>
                    </a>
                    <a class="text-white pl-2" href="">
                        <i class="fab fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <!-- Trong phần head của tệp HTML -->
<div class="bottom-header">


    <div class="logo">
            <img src="../images/magic_post.png" alt="Logo">
            <p>Macgic Post</p>
        </div>
        <div class="search-container">
      <input type="text" class="search-input" v-model="searchTerm" placeholder="Nhập từ khóa tìm kiếm"  @keyup.enter="funcion_submit()" >
      <div class="search-icon" @click="funcion_submit">
        <i class="fas fa-search"></i>
      </div>
    </div>
    <div class="navbar">    
   
    <a class="item" ><router-link to="/home">Trang chủ</router-link></a>
    <div class="item">
        <a class="item" ><router-link to="/boss">Dịch vụ</router-link></a>
        <div class="chill-item">
            <a class="item"><router-link to="/boss">Giao hàng trong nước</router-link></a>
            <a class="item" ><router-link to="/boss">Giao hàng nước ngoài</router-link></a>
            <a class="item" ><router-link to="/boss">Giao hàng tiết kiệm</router-link></a>
        </div>
    </div>
    <a class="item" ><router-link to="/">Tin tức</router-link></a>
    <a class="item" ><router-link to="/contact">Giới thiệu</router-link></a>
    <a class="item" ><router-link to="/">Tuyển dụng</router-link></a>
    <a class="item" ><router-link to="/contact">Liên hệ</router-link></a>
</div>

        <div class="header-top">
        <router-link to="/login" class="login-button">Đăng nhập</router-link>
        
                     
    </div>

  </div>
  </header>
  
</template>


<script>


export default {
  name: 'PageHeader',
  data() {
    return {
      searchTerm : '',
    };

  },
  methods: {
  funcion_submit() {
    console.log(this.searchTerm)
  }
  },
  // Add component logic here if needed
}
</script>

<style scoped>
/* ... (các quy tắc CSS hiện tại) ... */

.bottom-header {
  height: 100%;
    color: rgb(19, 7, 54);
    background-color: #ccc;
    display: flex;
    justify-content: space-between; 
     align-items: center;
    flex-wrap: wrap; /* Để các phần tử trên dòng mới khi không đủ không gian */
}

.logo {
    display: flex;
    align-items: center;
}

.logo p {
    font-weight: bold;
    font-size: 20px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    margin-top: 22px;
    /* margin-left: 10px; Khoảng cách giữa hình ảnh và văn bản */
}

.logo img {
    max-width: 100px;
    max-height: 100px;
}

.search-container {
    display: flex;
    align-items: center;
    margin-left: auto; /* Đẩy về bên phải của không gian còn lại */
    
}

/* Kiểu cho ô input tìm kiếm */
.search-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 20px;
    margin-right: 4px;
    width: 200px; /* Độ rộng của ô input */
}

.search-icon {
    cursor: pointer;
    font-size: 25px;
}

.navbar {
  height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    flex-wrap: wrap; /* Để các phần tử trên dòng mới khi không đủ không gian */
}

.item {
    padding:20px;
    position: relative;
    height: 100%;
}

.item:hover {

color:white;
  background: #007bff!important;
}
.item a {
    color: black;
    text-decoration: none;
    font-weight: 600;
}

/* Màu văn bản khi di chuột qua */
.item a:hover {
    color: white; /* Màu mới khi di chuột qua */
}
.chill-item {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.item:hover .chill-item {
    display: flex;
    flex-direction: column;
}

 .header-top {
    margin-left: auto; 
 }

.login-button {
    padding: 10px 15px;
    background-color: #3498db;
    color: #fff;
    text-decoration: none;
    border-radius: 20px;
    display: inline-block;
    margin-right: 20px;
}

/* ... (các quy tắc CSS khác nếu có) ... */
</style>

