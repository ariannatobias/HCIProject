// // // Divvy/utils/api.ts
// // import axios from 'axios';

// // const API_BASE_URL = 'http://127.0.0.1:8000'; // FastAPI running locally

// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   },
// // });

// // export default api;


// // Divvy/utils/api.ts
// import axios from 'axios';
// import { Platform } from 'react-native';

// // Determine base URL based on environment
// const getBaseUrl = () => {
//   if (__DEV__) { // React Native's global flag for development mode
//     if (Platform.OS === 'android') {
//       // Android emulator access to localhost via special IP
//       return 'http://10.205.204.203:8000';
//     }
//     // iOS simulator and physical device configuration
//     return 'http://localhost:8000'; // For physical devices, replace localhost with your computer's IP
//   }
//   // Production URL
//   return 'https://10.205.204.203:8000';
// };

// // Configure axios instance
// const api = axios.create({
//   baseURL: getBaseUrl(),
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add error handling interceptor
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       // Handle HTTP error statuses
//       console.error('API Error:', error.response.status, error.response.data);
//       return Promise.reject({
//         status: error.response.status,
//         message: error.response.data?.detail || 'Unknown error occurred',
//       });
//     }
//     console.error('Network Error:', error.message);
//     return Promise.reject({ message: 'Network connection failed' });
//   }
// );

// export default api;


import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'http://localhost:8000', // or use ENV
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token to every request
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
