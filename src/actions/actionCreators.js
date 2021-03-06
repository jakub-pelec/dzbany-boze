import {
    NEW_MESSAGE, CORRECT_CREDENTIALS, INCORRECT_CREDENTIALS, USER_REGISTERED, NEW_USER, SET_EMAIL
} from './types';

/**
 * Saves new message object to store.
 * @param {Object.<string, string>} payload - message data:
 * { message: 'message content', id: 'socket id'}
 */
export const saveNewMessageActionCreator = (payload) => ({
    type: NEW_MESSAGE,
    payload
});

export const authenticateUserActionCreator = (payload) => {
    switch (payload) {
        case 'auth/user-not-found':
            return {
                type: INCORRECT_CREDENTIALS,
                payload: false,
                errorMessage: 'User not found'
            };
        case 'auth/wrong-password':
            return {
                type: INCORRECT_CREDENTIALS,
                payload: false,
                errorMessage: 'Incorrect password'
            };
        case 'auth/too-many-requests':
            return {
                type: INCORRECT_CREDENTIALS,
                payload: false,
                errorMessage: 'Too many attempts! Chill for a while'
            };
        case true:
            return {
                type: CORRECT_CREDENTIALS,
                payload,
                errorMessage: null
            };
        default:
            return {
                type: INCORRECT_CREDENTIALS,
                payload: false,
                errorMessage: 'Oops! Something went wrong!'
            };
    }
};

export const showProppperRegistrationInfoActionCreator = (payload) => ({
    type: USER_REGISTERED,
    payload
});

export const saveNicknameToStoreActionCreator = (payload) => ({
    type: NEW_USER,
    payload
});

export const saveEmailToStoreActionCreator = (payload) => ({
    type: SET_EMAIL,
    payload
})
