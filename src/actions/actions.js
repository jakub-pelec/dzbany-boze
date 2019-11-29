import firebase from 'firebase';
import firebaseInit from '../firebase/firebaseInit';
import {
    saveNewMessageActionCreator,
    authenticateUserActionCreator,
    showProppperRegistrationInfoActionCreator,
    saveNicknameToStoreActionCreator,
    saveEmailToStoreActionCreator
} from './actionCreators';

firebaseInit();
const messagesPath = 'dzbany/messages/messages';
const usersPath = 'dzbany/users/users';
export const firestore = firebase.firestore();
export const saveNewMessageToStore = (data) => async (dispatch) => {
    dispatch(saveNewMessageActionCreator(data));
};

export const saveNewMessageToDatabse = async (data) => {
    firestore
        .collection(messagesPath)
        .add(data)
        .catch((error) => {
            throw new Error(`Error saving to database: ${error}`);
        });
};

export const authenticateUser = (email, password, history) => (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((response) => {
            if (!response.error) {
                dispatch(authenticateUserActionCreator(true));
                dispatch(saveEmailToStoreActionCreator(email));
                localStorage.setItem('email', email);
                history.push('/nickname');
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

export const checkIfUserHasNickname = async (email) => {
    await firebase
        .firestore()
        .collection(usersPath)
        .doc(email)
        .get()
        .then((doc) => {
            const data = doc.data();
            if (data.nickname) {
                return true;
            }
            return false;
        })
        .catch((err) => {
            throw new Error(`Error accesing database: ${err}`);
        });
};

export const getNicknameOfUserFromDB = (email) => async (dispatch) => {
    const nickname = await firebase
        .firestore()
        .collection(usersPath)
        .doc(email)
        .get()
        .then((doc) => {
            const { nickname } = doc.data();
            return nickname;
        })
        .catch((err) => {
            throw new Error(`Error accesing database: ${err}`);
        });
    dispatch(saveNicknameToStoreActionCreator(nickname));
};

export const saveEmailToStore = (email) => (dispatch) => {
    dispatch(saveEmailToStoreActionCreator(email));
}