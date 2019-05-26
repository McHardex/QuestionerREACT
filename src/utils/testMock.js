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
    username: 'mchardex',
    email: `${random}@gmail.com`,
    password: '12jj678',
    confirmPassword: '12jj678',
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
    resetComponent: jest.fn(),
    getRsvpByUser: jest.fn(),
    postRsvp: jest.fn(),
    upvoteAndDownvoteQuestion: jest.fn(),
    loading: { loader: true },
    postComments: jest.fn(),
    clearError: jest.fn(),
    match: { params: { id: 1 } },
  },
  profileProps: {
    getCurrentUser: jest.fn(),
    updateProfile: jest.fn(),
    getQuestionsCount: jest.fn(),
    getCommentsCount: jest.fn(),
    getUpcomingMeetups: jest.fn(),
    loading: { loader: true },
    meetups: {
      user: {
        firstname: 'adenisi',
        lastname: 'bukunmi',
        email: 'test@gmail.com',
      },
    },
    profile: { name: 'bukunmi' },
  },
  adminProps: {
    getAllMeetups: jest.fn(),
    updateMeetup: jest.fn(),
    getSingleMeetup: jest.fn(),
    createMeetup: jest.fn(),
    deleteMeetup: jest.fn(),
    clearError: jest.fn(),
    meetups: {
      meetups: [
        { location: 'title', topic: 'not again', tags: ['name', 'any'] },
        { location: 'today', topic: 'when again', tags: ['name', 'any'] }],
    },
    admin: {},
  },
};

export default mock;
