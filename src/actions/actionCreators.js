import { NEW_MESSAGE } from './types';

export const saveNewMessageActionCreator = (message, id) => {
    return {
        type: NEW_MESSAGE,
        payload: {message, id}
    }
}