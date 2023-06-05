// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvc-8W3GqvcV0AhM4P9TEnuSvXtr9lDJo",
  authDomain: "notes2-the-game.firebaseapp.com",
  projectId: "notes2-the-game",
  storageBucket: "notes2-the-game.appspot.com",
  messagingSenderId: "1044838957404",
  appId: "1:1044838957404:web:c91bc1e0b11e7f03384199"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);