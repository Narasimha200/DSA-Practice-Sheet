// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcG0MulUZBsIak297uREYnMwFA79UUsUk",
  authDomain: "dsa-practice-sheet.firebaseapp.com",
  projectId: "dsa-practice-sheet",
  storageBucket: "dsa-practice-sheet.appspot.com",
  messagingSenderId: "394201875199",
  appId: "1:394201875199:web:05478c2bcd5a254613c2ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);