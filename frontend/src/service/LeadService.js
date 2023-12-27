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

  async deleteStaff(payload) {
    try {
      const userId = payload;
      const { data } = await useApiPrivate().delete(`/api/index/deleteStaff`, {
        params: { userId },
      });
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async updateHead(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/updateHead`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async getAllPermission() {
    try {
      const { data } = await useApiPrivate().get(`/api/index/getAllPermission`);
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

  async getCollectionPoint() {
    try {
      const { data } = await useApiPrivate().get(
        `/api/index/getCollectionPoint`
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async getAllPoint() {
    try {
      const { data } = await useApiPrivate().get(`/api/index/getAllPoint`);
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async getTransactionPoint() {
    try {
      const { data } = await useApiPrivate().get(
        `/api/index/getTransactionPoint`
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
