import { saveNewMessageActionCreator, authenticateUserActionCreator } from './actionCreators';
import firebase from 'firebase/app';
import 'firebase/storage';
import firebaseInit from '../firebase/firebaseInit';
const usernameAuth = 'username';
const passwordAuth = 'password';

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

export const authenticateUser = data => dispatch => {
    const { username, password } = data;
    const correctCredentials = username === usernameAuth && password === passwordAuth;
    dispatch(authenticateUserActionCreator(correctCredentials));
};
