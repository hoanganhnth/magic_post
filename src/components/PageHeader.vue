<!-- Header.vue -->
<!-- Nơi bạn muốn đặt liên kết chuyển hướng, chẳng hạn trong file Header.vue -->
<template>
  <header>
    <!-- Trong phần head của tệp HTML -->

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
        <nav>
            <ul>
                <li><router-link to = "/cart">Dịch vụ</router-link></li>
                <li><router-link to = "/home">Tra cứu</router-link></li>
                <li><router-link to = "/order">Tin tức</router-link></li>
                <li><router-link to = "/list">Giới thiệu</router-link></li>
                <li><router-link to = "/list">Tuyển dụng</router-link></li>
                <li><router-link to = "/list">Liên hệ</router-link></li>
            </ul>
        </nav>
        <div class="header-top">
        <router-link to="/login" class="login-button">Đăng nhập</router-link>
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
/* Add component-specific styles here */
.search-icon {
            cursor: pointer;
            font-size: 25px;
        }
.search-container {
            display: flex;
            align-items: center;
        }

        /* Thiết lập kiểu cho ô input tìm kiếm */
        .search-input {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 20px;
            margin-right: 4px;
        }



header {
    background-color: orange; /* Màu nền của header */
    color: #fff; /* Màu chữ của header */
    padding: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

}
.logo {
  display: flex;
}
.logo p {
  font-weight: bold;
    font-size: 20px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

.logo img {
    max-width: 100px;
    max-height: 100px;
}

nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
}

nav li {
    margin-right: 20px;
}

nav a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
}

/* Hiệu ứng hover khi di chuột vào các lựa chọn */
nav a:hover {
    border-bottom: 2px solid #fff;
}

/* Responsive styles for smaller screens */
@media screen and (max-width: 768px) {
    header {
        flex-direction: column; /* Chuyển sang layout dọc */
        align-items: center; /* Căn giữa */
    }

    .search-container {
        margin-top: 10px; /* Khoảng cách giữa search và navigation */
    }

    .search-input {
        width: 100%; /* Ô input đầy đủ chiều rộng */
    }

    nav ul {
        flex-direction: column; /* Chuyển sang layout dọc */
        text-align: center; /* Căn giữa */
    }

    nav li {
        margin-right: 0;
        margin-bottom: 10px; /* Khoảng cách giữa các mục navigation */
    }
  }
  .header-top {
    /* position: absolute; */
    top: 0;
    right: 0;
}

.login-button {
    padding: 10px 15px;
    background-color: #3498db; /* Màu nền của nút */
    color: #fff; /* Màu chữ của nút */
    text-decoration: none;
    border-radius: 20px; /* Bo góc của nút */
    display: inline-block;
}
</style>
