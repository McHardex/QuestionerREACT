const initialState = {
  isLoading: false,
};

const loader = (state = initialState, action) => {
  const { type } = action;
  const matches = /(.*)_(LOADING|SUCCESS|ERROR)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    isLoading: requestState === 'LOADING',
    [requestName]: requestState,
  };
};

export default loader;
