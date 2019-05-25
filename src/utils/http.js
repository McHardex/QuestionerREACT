import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:2000/api/v1',
  headers: {
    'x-auth-token': JSON.parse(localStorage.getItem('token')),
  },
});

export default http;
// https://questioner-mchardex.herokuapp.com/api/v1;
