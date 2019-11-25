import { CORRECT_CREDENTIALS, INCORRECT_CREDENTIALS, USER_REGISTERED } from '../actions/types';

const INITIAL_STATE = {
  isAuthenticated: false,
  errorMessage: null,
  userRegisteredMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CORRECT_CREDENTIALS:
      return {
        ...state,
        isAuthenticated: true,
        errorMessage: null,
      };
    case INCORRECT_CREDENTIALS:
      return {
        ...state,
        isAuthenticated: false,
        errorMessage: action.errorMessage,
      };
    case USER_REGISTERED: {
      return {
        ...state,
        userRegisteredMessage: action.payload,
      };
    }
    default:
      return state;
  }
};
