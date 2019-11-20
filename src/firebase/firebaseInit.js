import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../environment/firebaseConfig';

const firebaseInit = () => {
    firebase.initializeApp(firebaseConfig);
};

export default firebaseInit;
