import jwtDecode from 'jwt-decode';

const decodeToken = (token) => {
  const decodedToken = jwtDecode(token);
  return decodedToken;
};

export default decodeToken;
