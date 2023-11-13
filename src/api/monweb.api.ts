import axios from 'axios';
import { useAuthStore } from '../stores';

const monwebApi = axios.create({
  baseURL: 'http://localhost:3000'
});

monwebApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token ?? '';
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  }
);

export { monwebApi };
