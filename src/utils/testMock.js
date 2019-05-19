const random = (Math.random() * 100).toString(32).slice(3);
const mock = {
  signupProps: {
    signUpUser: jest.fn(),
    clearError: jest.fn(),
    loading: { loader: true },
    auth: {},
  },
  loginProps: {
    login: jest.fn(),
    loginUser: jest.fn(),
    clearError: jest.fn(),
    loading: { loader: true },
    auth: {},
  },
  signupPayload: {
    firstname: 'Adesi',
    lastname: 'bukui',
    othername: 'joshink',
    username: 'mchardex',
    phoneNumber: '081601343464',
    email: `${random}@gmail.com`,
    password: '12jj678',
  },
  login: {
    email: 'dokosd@gmail.com',
    password: '123450jj678',
  },
};

export default mock;
