import {defineStore} from "pinia"
import {useApi, useApiPrivate} from "../composables/useApi"


export const useAuthStore = defineStore("auth", {
  
  actions: {
    async createAccountHead(payload) {
      try {
        const { data } = await useApi().post(`/api/index/registerStaff`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },
    
    async getAllHead(payload) {
      try {
        const { data } = await useApi().get(`/api/index/getAllHead`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async getAllPermission(payload) {
      try {
        const { data } = await useApi().get(`/api/index/getAllPermission`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async getAllRole(payload) {
      try {
        const { data } = await useApi().get(`/api/index/allRole`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async createCollectionPoint(payload) {
      try {
        const { data } = await useApi().post(`/api/index/createCollectionPoint`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async createTransactionPoint(payload) {
      try {
        const { data } = await useApi().post(`/api/index/createTransactionPoint`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async deleteCollectionPoint(payload) {
      try {
        const { data } = await useApi().delete(`/api/index/deleteCollectionPoint`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async deleteTransactionPoint(payload) {
      try {
        const { data } = await useApi().delete(`/api/index/deleteTransactionPoint`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async getCollectionPoint(payload) {
      try {
        const { data } = await useApi().get(`/api/index/getCollectionPoint`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async getTransactionPoint(payload) {
      try {
        const { data } = await useApi().get(`/api/index/getTransactionPoint`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

    async deleteShipment(payload) {
      try {
        const { data } = await useApi().delete(`/api/index/deleteShipment`, payload);
        return data;
      } catch (error) {
        throw error.message;
      }
    },

  }
});
