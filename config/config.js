import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
// import "firebase/firestore";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA2Y5sZN_FE8B5zhdStn6ylq3X3_GModKQ",
  authDomain: "laccasa.firebaseapp.com",
  projectId: "laccasa",
  storageBucket: "laccasa.appspot.com",
  messagingSenderId: "902473169127",
  appId: "1:902473169127:web:9fcebf9c0d6ae118c68a42",
  measurementId: "G-XDLD6ZLG2X"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase Authentication and get a reference to the service
export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = firebase.firestore()