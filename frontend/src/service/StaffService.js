// AuthService.js

import { useApiPrivate } from "../composables/useApi";

export const StaffService = {
  async createNewShipment(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/createNewShipment`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async deleteNewShipment(payload) {
    try {
      const { data } = await useApiPrivate().delete(
        `/api/index/deleteNewShipment`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async updateStaff(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/updateStaff`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async createShipmentFromTPToCP(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/createShipmentFromTPToCP`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },
  async createShipmentToUser(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/createShipmentToUser`,
        payload
      );
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
  async confirmShipmentSuOrCa(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/confirmShipmentSuOrCa`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },
  async confirmShipmentFromCPToTP(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/confirmShipmentFromCPToTP`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async getShipmentTransaction() {
    try {
      const { data } = await useApiPrivate().get(
        `/api/index/getShipmentTransaction`
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async createShipmentCancel(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/createShipmentCancel`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async creatconfirmPaidedeShipmentCancel(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/creatconfirmPaidedeShipmentCancel`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async confirmShipmentFromTPToCP(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/confirmShipmentFromTPToCP`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async createShipmentFromCPToCP(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/createShipmentFromCPToCP`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async confirmShipmentFromCPToCP(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/confirmShipmentFromCPToCP`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async createShipmentFromCPToTP(payload) {
    try {
      const { data } = await useApiPrivate().post(
        `/api/index/createShipmentFromCPToTP`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async registerStaff(payload) {
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

  async getAllStaff(payload) {
    try {
      const { data } = await useApiPrivate().get(
        `/api/index/getAllStaff`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },

  async getShipmentCollection(payload) {
    try {
      const { data } = await useApiPrivate().get(
        `/api/index/getShipmentCollection`,
        payload
      );
      return data;
    } catch (error) {
      throw error.message;
    }
  },
};

export default StaffService;
