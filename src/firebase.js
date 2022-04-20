import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAipbz2wbNIzPJztjILAFixKbbIIzr6LY0",
    authDomain: "lindos-gram.firebaseapp.com",
    projectId: "lindos-gram",
    storageBucket: "lindos-gram.appspot.com",
    messagingSenderId: "229257744636",
    appId: "1:229257744636:web:7d3dbfaba9c1c543980779",
    measurementId: "G-E6NLPRR2C4"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const functions = firebase.functions();

export {db, auth, storage, functions}