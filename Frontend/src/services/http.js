import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

export default axios;