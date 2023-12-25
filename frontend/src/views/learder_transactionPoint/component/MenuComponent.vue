<template>
  <div class="dashboard-nav" id="napbar">
    <header>
      <p class="brand-logo">
        <i class="fas fa-shipping-fast"></i> <span id="admin">Leader</span>
      </p>
    </header>
    <nav class="dashboard-nav-list">
      <router-link to="/leader_transaction"
        ><a href="#" class="dashboard-nav-item"
          ><i class="fas fa-box-open"></i> Quản lý đơn hàng
        </a></router-link
      >

      <router-link to="/leader_transaction/creat"
        ><a href="#" class="dashboard-nav-item"
          ><i class="fas fa-users"></i> Quản lý tài khoản
        </a></router-link
      >
      <div class="nav-item-divider"></div>
      <router-link to="/">
        <a href="#" class="dashboard-nav-item"
          ><i class="fas fa-sign-out-alt"></i> Đăng xuất</a
        ></router-link
      >
    </nav>
  </div>
</template>

<script>
export default {
  name: "MenuComponent",
};
</script>
