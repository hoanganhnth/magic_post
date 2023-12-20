<template>
  <div class="dashboard-nav" id="napbar">
    <header>
      <p class="brand-logo">
        <i class="fas fa-anchor"></i> <span id="admin">ADMIN</span>
      </p>
    </header>
    <nav class="dashboard-nav-list">
      <router-link to="/boss">
        <a href="#" class="dashboard-nav-item"
          ><i class="fas fa-home"></i> Trang chủ
        </a>
      </router-link>
      <router-link to="/boss/statistical"
        ><a href="#" class="dashboard-nav-item"
          ><i class="fas fa-file-upload"></i> Quản lý đơn hàng
        </a></router-link
      >

      <router-link to="/boss/manage_collection"
        ><a href="#" class="dashboard-nav-item"
          ><i class="fas fa-tachometer-alt"></i> Quản lý hệ thống</a
        >
      </router-link>

      <router-link to="/boss/employee"
        ><a href="#" class="dashboard-nav-item"
          ><i class="fas fa-users"></i> Quản lý tài khoản
        </a></router-link
      >
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
import { useAuthStore } from "../../store/auth";
export default {
  name: "NavBar",
  methods: {
    async logout() {
      try {
      await useAuthStore().logout();
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
}

nav {
  display: block;
}

#admin {
  color: white;
}

#napbar {
  background-color: #081c3d;
}

.dashboard {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  min-height: 100vh;
}

.dashboard-app {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 2;
  -webkit-flex-grow: 2;
  -ms-flex-positive: 2;
  flex-grow: 2;
  margin-top: 84px;
}

.dashboard-content {
  -webkit-box-flex: 2;
  -webkit-flex-grow: 2;
  -ms-flex-positive: 2;
  flex-grow: 2;
  padding-left: 25px;
  padding-right: 25px;
}

.dashboard-nav {
  min-width: 238px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow: auto;
  background-color: #0b0836;
}

.dashboard-nav header {
  min-height: 84px;
  padding: 8px 27px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.dashboard-nav a {
  color: #515151;
}
.dashboard-nav div {
  padding-left: 0px;
  color: #515151;
}

.dashboard-nav a:hover {
  color: rgb(16, 8, 63);
  background-color: #dbdbdb;
  text-decoration: none;
}
.dashboard-nav-item a:hover {
  color: rgb(16, 8, 63);
  background-color: #dbdbdb;
  text-decoration: none;
}

.dashboard-nav a {
  color: #fff;
}

.brand-logo {
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  font-size: 20px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  color: #515151;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.brand-logo:focus,
.brand-logo:active,
.brand-logo i {
  color: #d2d1d1;
  font-size: 27px;
  margin-right: 10px;
}

.dashboard-nav-list {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}

.dashboard-nav-item {
  min-height: 56px;

  padding: 8px 20px 8px 70px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  letter-spacing: 0.02em;
  transition: ease-out 0.5s;
}

.dashboard-nav-item i {
  width: 36px;
  font-size: 19px;
  margin-left: -40px;
}

.nav-item-divider {
  height: 1px;
  margin: 1rem 0;
  overflow: hidden;
  background-color: rgba(236, 238, 239, 0.3);
}

@media (min-width: 992px) {
  .dashboard-app {
    margin-left: 238px;
  }

  .dashboard-compact .dashboard-app {
    margin-left: 0;
  }
}

@media (max-width: 768px) {
  .dashboard-content {
    padding: 15px 0px;
  }
}

@media (max-width: 992px) {
  .dashboard-nav {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1070;
  }

  .dashboard-nav.mobile-show {
    display: block;
  }
}
</style>
