import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const API_BASE = 'http://127.0.0.1:4000';
export const API_BASE = 'http://89.233.108.199:5005';

export const AxiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});

AxiosInstance.interceptors.request.use(async function (config) {
  const token = await AsyncStorage.getItem('token');

  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }

  return config;
});

AxiosInstance.interceptors.response.use(
  function (response) {
    return Promise.resolve(response);
  },
  function (error) {
    // if (error.response.status === 401) {
    //   localStorage.removeItem('token');
    //   window.location.replace('/login');
    // }
    return Promise.reject(error);
  },
);
