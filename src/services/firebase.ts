// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcOiBqFU3oWe1xK8LukoLK8KWktuS7Qkk",
  authDomain: "portal-telefonia.firebaseapp.com",
  projectId: "portal-telefonia",
  storageBucket: "portal-telefonia.firebasestorage.app",
  messagingSenderId: "866933992260",
  appId: "1:866933992260:web:361a7df7d938d1a9738511"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);