// AuthService.js

import axios from 'axios';

const AuthService = {
  async login(username, password) {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService;
