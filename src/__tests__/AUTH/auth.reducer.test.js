// import actionType from '../../constants/actionTypes';
// import authReducer from '../../reducers/authReducers';

// describe('auth reducer', () => {
//   it('should return the initial state', () => {
//     expect(authReducer(undefined, {})).toEqual({
//       errorMessage: null,
//       signupSuccess: false,
//       signupError: false,
//       loginError: false,
//       isLoading: false,
//       redirect: false,
//     });
//   });

//   it('should handle FETCH_ARTICLES_SUCCESS', () => {
//     expect(
//       articleReducer([], {
//         type: types.FETCH_ARTICLES_SUCCESS,
//         articles: [{ articleData: 'article' }],
//       }),
//     ).toEqual({
//       articleData: [{ articleData: 'article' }],
//     });
//   });

//   it('should handle FETCH_ARTICLES_FAILURE', () => {
//     expect(
//       articleReducer([], {
//         type: types.FETCH_ARTICLES_FAILURE,
//       }),
//     ).toEqual({});
//   });
// });
