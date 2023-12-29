<template>
  <div class="dashboard-nav" id="napbar">
    <header>
      <p class="brand-logo">
        <i class="fas fa-shipping-fast"></i> <span id="admin">EMPLOYEE</span>
      </p>
    </header>
    <nav class="dashboard-nav-list">
      <v-img
        style="margin-left: 70px"
        :width="80"
        aspect-ratio="9/9"
        cover
        src="../../../assets/images/user.png"
      >
      </v-img>
      <p style="margin-left: 70px; color: aliceblue">{{ userName }}</p>
      <router-link to="/employee_collection">
        <a href="#" class="dashboard-nav-item"
          ><i class="fas fa-box-open"></i> Xử lý đơn hàng
        </a>
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
import { useAuthStore } from "../../../store/auth";
export default {
  name: "NavBarEmployee",
  data() {
    return {
      userName: "@sonduong",
    };
  },
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

<style></style>
