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
  meetupProps: {
    meetups: {
      meetups: [
        { location: 'title', topic: 'not again', tags: ['name', 'any'] },
        { location: 'today', topic: 'when again', tags: ['name', 'any'] }],
    },
    getAllMeetups: jest.fn(),
    loading: { loader: true },
    value: 'bukunmi',
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
    email: 'bukunm@gmail.com',
    password: 'password',
  },
  singleMeetupProps: {
    meetups: {
      meetup: [
        { location: 'title', topic: 'not again', tags: ['name', 'any'] },
        { location: 'today', topic: 'when again', tags: ['name', 'any'] }],
    },
    postQuestions: jest.fn(),
    getSingleMeetup: jest.fn(),
    getRsvp: jest.fn(),
    postRsvp: jest.fn(),
    upvoteAndDownvoteQuestion: jest.fn(),
    postComments: jest.fn(),
    clearError: jest.fn(),
    match: { params: { id: 1 } },
  },
};

export default mock;
