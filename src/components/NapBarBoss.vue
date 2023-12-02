<template>
    <nav>
        <div class="nav-container">
      <router-link to="/users">Quản lý nhân viên</router-link>
      <router-link to="/transaction">Quản lý điểm giao dịch</router-link>
      <router-link to="/collection">Quản lý điểm tập kết</router-link>
      <router-link to="/boss">Thống kê đơn hàng</router-link>
    </div>
    </nav>
  </template>
  
  <script>
  export default {
    name: 'NavBar'
  };
  </script>
  
  <style>
  /* Thêm style cho thanh điều hướng tùy thuộc vào thiết kế của bạn */
  nav {
  background-color: #333;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

router-link {
  color: white;
  text-decoration: none;
  padding: 10px;
  transition: background-color 0.3s ease;
}

router-link:hover {
  background-color: #555;
}

router-link.active {
  background-color: #555;
}
  </style>
  