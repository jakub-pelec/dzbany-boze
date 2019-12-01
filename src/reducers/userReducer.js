import { NEW_USER } from '../actions/types';

const INITIAL_STATE = {
    nickname: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case NEW_USER:
        return {
            ...state,
            nickname: action.payload
        };
    default:
        return state;
    }
};
