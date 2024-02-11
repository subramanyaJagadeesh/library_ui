import axios from 'axios';
import Cookies from 'universal-cookie';

const backend = axios;
const cookies = new Cookies();


backend.interceptors.request.use(
  (config) => {
    config.baseURL = "http://localhost:9092";
    config.headers['Content-Type'] = "application/json";
    if(cookies.get('token')) config.headers['Authorization'] = `Bearer ${cookies.get('token')}`;
    return config;
  },
)

backend.interceptors.response.use((_) => _, (err) => {
  if(err?.response?.status === 401){
    cookies.remove('token');
    window.location.href = '/login';
  }
});

export default backend;