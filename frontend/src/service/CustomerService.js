import { useApi } from "../composables/useApi";

export const CustomerService = {
  async searchShipment(payload) {
    try {
      const shipmentId = payload;
      const { data } = await useApi().get(`/api/user/searchShipment`, {
        params: { shipmentId },
      });
      return data;
    } catch (error) {
      throw error.message;
    }
  },
};
