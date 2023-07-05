import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCQIugk15i1Nj0Co3VcD80mIYYKG2U4MFA",
    authDomain: "rafael-17e19.firebaseapp.com",
    databaseURL: "https://rafael-17e19-default-rtdb.firebaseio.com",
    projectId: "rafael-17e19",
    storageBucket: "rafael-17e19.appspot.com",
    messagingSenderId: "922867068904",
    appId: "1:922867068904:web:b4b3c2399234cbb3effe5d",
    measurementId: "G-LDTCE5WSJB"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
