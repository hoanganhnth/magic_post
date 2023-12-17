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
        const { data } = await useApi().post(`/api/auth/login`, payload);
        this.accessToken = data.access_token;
        // await this.getUser();
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

        this.user = data;
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async logout() {
      try {
        const { data } = await useApiPrivate().post(`/api/auth/logout`);
        this.accessToken = "";
        this.user = {};
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async refresh() {
      try {
        const { data } = await useApi().post(`/api/auth/refresh`);
        this.accessToken = data.access_token;
        return data;
      } catch (error) {
        throw error.message;
      }
    },
  },
});
