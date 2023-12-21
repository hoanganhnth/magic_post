import { useApiPrivate } from "../composables/useApi";

export const LeadService = {
  async createAccountHead(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/registerStaff`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async getAllHead() {
    try {
      const { data } = await useApiPrivate().get(`/api/index/getAllHead`);
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async getAllPermission(payload) {
    try {
      const { data } = await useApiPrivate().get(
        `/api/index/getAllPermission`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async getAllRole() {
    try {
      const { data } = await useApiPrivate().get(`/api/index/allRole`);
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async createCollectionPoint(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/createCollectionPoint`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async createTransactionPoint(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/createTransactionPoint`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async deleteCollectionPoint(payload) {
    try {
      const { data } = await useApiPrivate().delete(
        `/api/index/deleteCollectionPoint`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async deleteTransactionPoint(payload) {
    try {
      const { data } = await useApiPrivate().delete(
        `/api/index/deleteTransactionPoint`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async getCollectionPoint(payload) {
    try {
      const { data } = await useApiPrivate().get(
        `/api/index/getCollectionPoint`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async getTransactionPoint(payload) {
    try {
      const { data } = await useApiPrivate().get(
        `/api/index/getTransactionPoint`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async deleteShipment(payload) {
    try {
      const { data } = await useApiPrivate().delete(
        `/api/index/deleteShipment`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },
};
