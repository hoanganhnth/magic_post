import { defineStore } from "pinia";
import { useApi, useApiPrivate } from "../composables/useApi";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      user: {},
      accessToken: "",
      authReady: false,
    };
  },

  getters: {
    userDetail: (state) => state.user,
    isAuthenticated: (state) => (state.accessToken ? true : false),
  },
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
      // Lưu token vào localStorage để giữ lại giữa các phiên làm việc
      localStorage.setItem("token", token);
    },
    setUser(state, user) {
      state.user = user;
    },
    setAuthReady(state, value) {
      state.authReady = value;
    },
  },
  actions: {
    async attempt() {
      try {
        await this.refresh();
        await this.getUser();
      } catch (error) {
        return;
      }
    },

    async login(payload) {
      try {
        // console.log(state.accessToken);
        const { data } = await useApi().post(`/api/auth/login`, payload);
        this.accessToken = data.access_token;
        // await this.getUser();
        localStorage.setItem("token", data.access_token);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async register(payload) {
      try {
        const { data } = await useApi().post(`/api/auth/register`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async getUser() {
      try {
        const { data } = await useApiPrivate().get(`/api/auth/user`, {
          headers: {
            Authorization: "Bearer " + this.accessToken,
          },
        });
        localStorage.setItem("userrole", data.userRole);
        localStorage.setItem("permission", data.permission);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async logout() {
      try {
        await useApiPrivate().post(`/api/auth/logout`);
        // this.accessToken = "";
        // this.user = {};
        localStorage.removeItem("token");
        localStorage.removeItem("userrole");
        localStorage.removeItem("permission");
      } catch (error) {
        throw error.message;
      }
    },

    async refresh() {
      try {
        const { data } = await useApi().post(`/api/auth/refresh`);
        // commit("setAccessToken", data.access_token);
        this.accessToken = data.access_token;
        return data;
      } catch (error) {
        throw error.message;
      }
    },
  },
});
