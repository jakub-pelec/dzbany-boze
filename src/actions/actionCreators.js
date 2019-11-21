import { NEW_MESSAGE, CORRECT_CREDENTIALS, INCORRECT_CREDENTIALS } from './types';

/**
 * Saves new message object to store.
 * @param {Object.<string, string>} payload - message data: { message: 'message content', id: 'socket id'}
 */
export const saveNewMessageActionCreator = payload => {
    return {
        type: NEW_MESSAGE,
        payload
    }
};

export const authenticateUserActionCreator = payload => {
    return payload ? {
        type: CORRECT_CREDENTIALS,
        payload
    } : {
            type: INCORRECT_CREDENTIALS,
            payload
        }
};
