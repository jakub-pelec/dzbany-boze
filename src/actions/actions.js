import { saveNewMessageActionCreator } from './actionCreators';
import firebase from 'firebase/app';
import 'firebase/storage';
import firebaseInit from '../firebase/firebaseInit';

firebaseInit();
const messagesPath = 'dzbany/messages/messages';

export const firestore = firebase.firestore();
export const saveNewMessageToStore = data => async dispatch => {
    dispatch(saveNewMessageActionCreator(data))
};

export const saveNewMessageToDatabse = async data => {
    firestore
        .collection(messagesPath)
        .add(data)
        .catch(error => {
            throw new Error(`Error saving to database: ${error}`);
        });
}
