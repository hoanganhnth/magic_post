const axios = require('axios');
const apiKey = 'AIzaSyA9OFKWKH4_hoV7BrrQP7lFR3G10g10V4c';

async function calculateDistance(origin, destination) {
  try {
    // const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`;

    // const response = await axios.get(apiUrl);
    // if (response.data.status === 'OK') {
    //   return parseFloat(response.data.routes[0].legs[0].distance.text.replace(/[^\d.]/g, ''));
    // } else {
    //   console.error('Đã có lỗi khi gọi API Directions:', response.data.status);
    //   throw new Error('Failed to get directions.');
    // }
    return 100;
  } catch (error) {
    console.error('Đã có lỗi khi lấy thông tin đường đi:', error);
    throw error;
  }
}

async function calculateMinDistance(origin, destinations) {
  try {
    // const distances = await Promise.all(
    //   destinations.map(async (destination) => {
    //     const response = await axios.get(
    //       `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
    //     );
    //     return parseFloat(response.data.routes[0].legs[0].distance.text.replace(/[^\d.]/g, ''));
    //   })
    // );

    // const minDistance = Math.min(...distances);
    // const nearestLocation = destinations[distances.indexOf(minDistance)];
    const nearestLocation = destinations[0];
    console.log(nearestLocation)
    return nearestLocation;
  } catch (error) {
    console.error('Error fetching data from Google Maps API', error);
    throw error;
  }
}

module.exports = {
  calculateDistance,
  calculateMinDistance
};