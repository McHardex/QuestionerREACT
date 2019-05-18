const initialState = {
  loader: false,
};

const loading = (state = initialState, action) => {
  const { type } = action;
  const matches = /(.*)_(LOADING|SUCCESS|ERROR)/.exec(type);

  if (!matches) return state;

  const [, requestName, requestState] = matches;
  return {
    ...state,
    loader: requestState === 'LOADING',
    [requestName]: requestState,
  };
};

export default loading;
