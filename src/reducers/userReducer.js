import { NEW_USER, SET_EMAIL } from '../actions/types';

const INITIAL_STATE = {
    nickname: null,
    email: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case NEW_USER:
            return {
                ...state,
                nickname: action.payload
            };
        case SET_EMAIL:
            return {
                ...state,
                email: action.payload
            }
        default:
            return state;
    }
};
