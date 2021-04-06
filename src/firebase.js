import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBl2RV1HS0DQxdY6TtO1lR3QELuVV4BCgk",
    authDomain: "fast-chat-app-a6daf.firebaseapp.com",
    projectId: "fast-chat-app-a6daf",
    storageBucket: "fast-chat-app-a6daf.appspot.com",
    messagingSenderId: "832258809817",
    appId: "1:832258809817:web:bd0d77c3c4ffeecc25c3c8",
    measurementId: "G-VRRQ6FZWGG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
