import actionType from '../constants/actionTypes';

const initialState = {
  meetups: [],
  errorMessage: null,
  isLoading: true,
};

const meetups = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ALL_MEETUPS_SUCCESS:
      return {
        ...state, meetups: action.meetups, isLoading: false,
      };
    case actionType.ALL_MEETUPS_ERROR:
      return {
        ...state, errorMessage: action.error, isLoading: false,
      };
    default:
      return state;
  }
};

export default meetups;
