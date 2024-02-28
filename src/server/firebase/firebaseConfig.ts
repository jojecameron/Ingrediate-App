// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoxa8YJJqaiibr2rH_YwUB4BQIRz7kJf8",
  authDomain: "ingrediate.firebaseapp.com",
  projectId: "ingrediate",
  storageBucket: "ingrediate.appspot.com",
  messagingSenderId: "565966040641",
  appId: "1:565966040641:web:590a498df36150677360c0",
  measurementId: "G-PZ3F10K0N6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
