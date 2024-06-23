// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: process.env.REACT_APP_firebase_ApiKey,
    authDomain: process.env.REACT_APP_firebase_authDomain,
    projectId: process.env.REACT_APP_firebase_projectId,
    storageBucket: process.env.REACT_APP_firebase_storageBucket,
    messagingSenderId: process.env.REACT_APP_firebase_messagingSenderId,
    appId: process.env.REACT_APP_firebase_appId,
    measurementId: process.env.REACT_APP_firebase_measurementId
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const firestore = firebase.firestore();

export { firestore, storage };
