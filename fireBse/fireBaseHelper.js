import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const firebaseConfig = {
  apiKey: "AIzaSyCQIugk15i1Nj0Co3VcD80mIYYKG2U4MFA",
  authDomain: "rafael-17e19.firebaseapp.com",
  databaseURL: "https://rafael-17e19-default-rtdb.firebaseio.com",
  projectId: "rafael-17e19",
  storageBucket: "rafael-17e19.appspot.com",
  messagingSenderId: "922867068904",
  appId: "1:922867068904:web:b4b3c2399234cbb3effe5d",
  measurementId: "G-LDTCE5WSJB"};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase database
const database = firebase.database();
// Function to get all attacks
export function getAllAttacks() {
  return database.ref('attacks').once('value').then((snapshot) => {
    const attacks = [];
    snapshot.forEach((childSnapshot) => {
      attacks.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    return attacks;
  });
}

// Function to get attack by ID
export function getAttackById(attackId) {
  return database.ref(`attacks/${attackId}`).once('value').then((snapshot) => {
    return {
      id: snapshot.key,
      ...snapshot.val()
    };
  });
}

// Function to get attack by name
export function getAttackByName(name) {
  return database.ref('attacks').orderByChild('name').equalTo(name).once('value').then((snapshot) => {
    const attacks = [];
    snapshot.forEach((childSnapshot) => {
      attacks.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    return attacks;
  });
}

// Function to get attack by x_mitre_detection
export function getAttackByDetection(detection) {
  return database.ref('attacks').orderByChild('x_mitre_detection').equalTo(detection).once('value').then((snapshot) => {
    const attacks = [];
    snapshot.forEach((childSnapshot) => {
      attacks.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    return attacks;
  });
}

// Function to get attack by x_mitre_platforms
export function getAttackByPlatforms(platforms) {
  return database.ref('attacks').orderByChild('x_mitre_platforms').equalTo(platforms).once('value').then((snapshot) => {
    const attacks = [];
    snapshot.forEach((childSnapshot) => {
      attacks.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
    });
    return attacks;
  });
}
