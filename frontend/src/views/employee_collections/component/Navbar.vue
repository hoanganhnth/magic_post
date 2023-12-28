<template>
  <div class="dashboard-nav" id="napbar">
    <header>
      <p class="brand-logo">
        <i class="fas fa-shipping-fast"></i> <span id="admin">EMPLOYEE</span>
      </p>
    </header>
    <nav class="dashboard-nav-list">
      <router-link to="/employee_collection">
        <a href="#" class="dashboard-nav-item"
          ><i class="fas fa-box-open"></i> Xử lý đơn hàng
        </a>
      </router-link>

      <div class="nav-item-divider"></div>
      <router-link to="/" @click="logout">
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
