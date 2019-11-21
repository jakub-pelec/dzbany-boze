import firebase from 'firebase';

export default (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User registered! Please log in.');
        })
        .catch(error => {
            throw new Error(`Error registering user: ${error}`);
        });
}