import { CORRECT_CREDENTIALS, INCORRECT_CREDENTIALS } from '../actions/types';

const INITIAL_STATE = {
    isAuthenticated: false,
    errorMessage: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CORRECT_CREDENTIALS:
            return {
                ...state,
                isAuthenticated: true,
                errorMessage: null
            }
        case INCORRECT_CREDENTIALS:
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: action.errorMessage
            }
        default:
            return state
    }
}