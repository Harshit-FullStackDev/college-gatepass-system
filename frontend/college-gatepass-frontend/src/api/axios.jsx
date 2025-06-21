import axios from 'axios';

// const instance = axios.create({
//   baseURL: 'http://localhost:8080/api',
// });
const instance = axios.create({
  baseURL: 'https://college-gatepass-backend.onrender.com',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
