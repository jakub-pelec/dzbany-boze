import firebase from 'firebase';
import firebaseInit from '../firebase/firebaseInit';
import {
    saveNewMessageActionCreator,
    authenticateUserActionCreator,
    showProppperRegistrationInfoActionCreator,
    saveNicknameToStoreActionCreator
} from './actionCreators';

firebaseInit();
const messagesPath = 'dzbany/messages/messages';
const usersPath = 'dzbany/users/users';
export const firestore = firebase.firestore();
export const saveNewMessageToStore = (data) => async(dispatch) => {
    dispatch(saveNewMessageActionCreator(data));
};

export const saveNewMessageToDatabse = async(data) => {
    firestore
        .collection(messagesPath)
        .add(data)
        .catch((error) => {
            throw new Error(`Error saving to database: ${error}`);
        });
};

export const authenticateUser = (email, password) => (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            if (!response.error) {
                dispatch(authenticateUserActionCreator(true));
            }
        })
        .catch((error) => {
            const { code } = error;
            dispatch(authenticateUserActionCreator(code));
        });
};

export const showInformationAboutRegister = (payload) => (dispatch) => {
    dispatch(showProppperRegistrationInfoActionCreator(payload));
};

export const createDocumentInDb = (email) => {
    firebase
        .firestore()
        .collection(usersPath)
        .doc(email)
        .set({})
        .catch((error) => {
            throw new Error(`Error creating document: ${error}`);
        });
};

export const changeNicknameInDb = (email, nickname) => {
    firebase
        .firestore()
        .collection(usersPath)
        .doc(email)
        .set({
            nickname
        })
        .catch((error) => {
            throw new Error(`Error adding nickanme: ${error}`);
        });
};

export const saveNicknameToStore = (nickname) => (dispatch) => {
    dispatch(saveNicknameToStoreActionCreator(nickname));
};
