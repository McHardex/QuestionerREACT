import axios from 'axios';

const http = axios.create({
  baseURL: 'https://questioner-mchardex.herokuapp.com/api/v1',
  headers: {
    'x-auth-token': JSON.parse(localStorage.getItem('token')),
  },
});

export default http;
