import {
    saveNewMessageActionCreator,
    authenticateUserActionCreator,
    showProppperRegistrationInfoActionCreator
} from './actionCreators';
import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/auth';
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

export const authenticateUser = (email, password) => dispatch => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            if (!response.error) {
                dispatch(authenticateUserActionCreator(true))
            }
        })
        .catch(error => {
            const { code } = error;
            dispatch(authenticateUserActionCreator(code));
        });
};

export const showInformationAboutRegister = payload => dispatch => {
    dispatch(showProppperRegistrationInfoActionCreator(payload));
}
