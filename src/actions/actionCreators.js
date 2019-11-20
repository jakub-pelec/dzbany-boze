import { NEW_MESSAGE } from './types';

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
