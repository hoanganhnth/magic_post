const axios = require('axios');

async function calculateDistance(origin, destination) {
  try {
    const apiKey = 'AIzaSyDGJzg7CGYeba8HyYvSRgL38RvRBxr1MVQ';
    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;
    
    const response = await axios.get(apiUrl);

    if (response.data.status === 'OK') {
      return response.data.routes[0].legs[0].distance.text;
    } else {
      console.error('Đã có lỗi khi gọi API Directions:', response.data.status);
      throw new Error('Failed to get directions.');
    }
  } catch (error) {
    console.error('Đã có lỗi khi lấy thông tin đường đi:', error);
    throw error;
  }
}

module.exports = {
  calculateDistance,
};