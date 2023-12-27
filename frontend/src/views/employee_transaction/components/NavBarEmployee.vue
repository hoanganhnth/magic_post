<template>
  <div class="dashboard-nav" id="napbar">
    <header>
      <p class="brand-logo">
        <i class="fas fa-shipping-fast"></i> <span id="admin">EMPLOYEE</span>
      </p>
    </header>
    <nav class="dashboard-nav-list">
      <router-link to="/employee_transaction">
        <a href="#" class="dashboard-nav-item"
          ><i class="fas fa-box-open"></i> Thông tin đơn hàng
        </a>
      </router-link>
      <router-link to="/employee_transaction/shipped"
        ><a href="#" class="dashboard-nav-item"
          ><i class="fas fa-cart-plus"></i> Tạo đơn hàng
        </a></router-link
      >

      <router-link to="/employee_transaction/print"
        ><a href="#" class="dashboard-nav-item"
          ><i class="fas fa-edit"></i> Ghi nhận và in biên nhận</a
        >
      </router-link>

      <div class="nav-item-divider"></div>
      <router-link to="" @click="logout">
        <a href="#" class="dashboard-nav-item"
          ><i class="fas fa-sign-out-alt"></i> Đăng xuất</a
        ></router-link
      >
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBarEmployee",
};
</script>

<style></style>
