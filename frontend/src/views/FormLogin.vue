<template>
  <section class="vh-100" style="background-color: #9a616d">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-xl-10">
          <div class="card" style="border-radius: 1rem">
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img
                  src="https://img.freepik.com/premium-vector/hand-drawn-delivery-concept_23-2149166398.jpg"
                  alt="login form"
                  class="img-fluid"
                  style="border-radius: 1rem 0 0 1rem"
                />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
                  <form @submit.prevent="login">
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i
                        class="fas fa-cubes fa-2x me-3"
                        style="color: #ff6219"
                      ></i>
                      <span class="h1 fw-bold mb-0">Logo</span>
                    </div>

                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px">
                      Sign into your account
                    </h5>

                    <div class="form-outline mb-4">
                      <input
                        type="text"
                        id="form2Example17"
                        class="form-control form-control-lg"
                        v-model="username"
                        required
                      />
                      <label class="form-label" for="form2Example17"
                        >Email address</label
                      >
                    </div>

                    <div class="form-outline mb-4">
                      <input
                        type="password"
                        id="form2Example27"
                        class="form-control form-control-lg"
                        v-model="password"
                        required
                      />
                      <label class="form-label" for="form2Example27"
                        >Password</label
                      >
                    </div>

                    <div class="pt-1 mb-4">
                      <button
                        class="btn btn-dark btn-lg btn-block"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                    <div v-if="error" class="alert alert-danger" role="alert">
                      {{ error }}
                    </div>

                    <a class="small text-muted" href="#!">Forgot password?</a>
                    <p class="mb-5 pb-lg-2" style="color: #393f81">
                      Don't have an account?
                    </p>
                    <router-link to="/register" style="color: blueviolet"
                      >Register here</router-link
                    >

                    <a href="#!" class="small text-muted">Terms of use.</a>
                    <a href="#!" class="small text-muted">Privacy policy</a>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useAuthStore } from "../store/auth";
export default {
  name: "FormLogin",
  data() {
    return {
      username: "",
      password: "",
      error: null, // Thêm biến error để lưu thông báo lỗi
    };
  },
  methods: {
    async login() {
      try {
        const payload = {
          username: this.username,
          password: this.password,
        };
        // const response = await AuthService.login(this.username, this.password);
        const data = await useAuthStore().login(payload);
        await useAuthStore().getUser();
        console.log(data);
        // Nếu đăng nhập thành công, chuyển hướng đến trang chính
        this.$router.push("/boss");
      } catch (error) {
        console.error(error);
        // Nếu có lỗi, hiển thị thông báo lỗi
        this.error = "Tài khoản hoặc mật khẩu chưa chính xác!";
      }
    },
  },
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>
