import firebase from 'firebase';

export default (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.auth().currentUser.sendEmailVerification();
        })
        .catch(error => {
            throw new Error(`Error registering user: ${error}`);
        });
}
