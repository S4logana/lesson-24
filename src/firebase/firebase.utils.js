import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAsw7aZHMmXummKG9XJHXpk_8OrxLNbwu4",
    authDomain: "crwn-db-c9005.firebaseapp.com",
    databaseURL: "https://crwn-db-c9005.firebaseio.com",
    projectId: "crwn-db-c9005",
    storageBucket: "crwn-db-c9005.appspot.com",
    messagingSenderId: "7761442491",
    appId: "1:7761442491:web:09ed2c1b519f25e1bb1b9e",
    measurementId: "G-PKCKXJHC1W"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
