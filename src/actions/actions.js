import { saveNewMessageActionCreator } from './actionCreators';

export const saveNewMessage = (message, id) => (dispatch) => {
    console.log(id);
    dispatch(saveNewMessageActionCreator(message, id))
};
