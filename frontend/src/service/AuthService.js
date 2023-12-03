// AuthService.js

import {useApi, useApiPrivate} from "../composables/useApi"

const AuthService = {
  async login(username, password) {
    try {
      const data= await useApi().post('/api/auth/login', {
        username,
        password,
      });
      return data;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
