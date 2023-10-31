// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxvDK4mN-jMtS42KW2wRXG8ZqnfwI4ghA",
  authDomain: "event-planner-7c085.firebaseapp.com",
  projectId: "event-planner-7c085",
  storageBucket: "event-planner-7c085.appspot.com",
  messagingSenderId: "221260137627",
  appId: "1:221260137627:web:84620bf490387c4a28323e",
  measurementId: "G-1Q490T6E42"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);