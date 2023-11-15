// axios.ts

import axios from 'axios';
import { useCookies } from 'react-cookie';

const instance = axios.create({
  baseURL: 'http://103.107.183.103:3000/api#/User/UserController_login', // Điểm cuối API của bạn
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
