import axios from 'axios';
import Cookies from 'universal-cookie';

const backend = axios;

backend.interceptors.request.use(
  (config) => {
    const cookies = new Cookies();
    config.baseURL = "http://localhost:9092";
    config.headers['Content-Type'] = "application/json";
    if(cookies.get('token')) config.headers['Authorization'] = `Bearer ${cookies.get('token')}`;
    return config;
  },
)

// backend.interceptors.response.use((_) => _, (err) => err?.response?.data?.message);

export default backend;