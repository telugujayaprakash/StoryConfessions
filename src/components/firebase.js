// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyClF2OmV6OZlxQaKYhAbVqAqNHiFOpEGMM",
    authDomain: "stories-23808.firebaseapp.com",
    projectId: "stories-23808",
    storageBucket: "stories-23808.appspot.com",
    messagingSenderId: "163562370047",
    appId: "1:163562370047:web:017317bc4caa5918c6adca",
    measurementId: "G-LXHNSM85M1"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const firestore = firebase.firestore();

export { firestore ,storage};
