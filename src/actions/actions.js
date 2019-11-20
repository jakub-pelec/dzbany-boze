import { saveNewMessageActionCreator } from './actionCreators';

export const saveNewMessage = (data) => (dispatch) => {
    dispatch(saveNewMessageActionCreator(data))
};
