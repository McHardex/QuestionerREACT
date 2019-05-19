import axios from 'axios';

const http = axios.create({
  baseURL: 'https://questioner-mchardex.herokuapp.com/api/v1',
  headers: {
    'x-auth-token': {
      toString() {
        return `${JSON.parse(localStorage.getItem('token'))}`;
      },
    },
  },
});

export default http;
// https://questioner-mchardex.herokuapp.com/api/v1;
