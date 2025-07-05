// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8WEVPOwhT7M6TXI4cj5APpjWQu1X-tbk",
  authDomain: "netflixgpt2-f03c2.firebaseapp.com",
  projectId: "netflixgpt2-f03c2",
  storageBucket: "netflixgpt2-f03c2.firebasestorage.app",
  messagingSenderId: "247780696385",
  appId: "1:247780696385:web:98660454e4aae553b601c0",
  measurementId: "G-72HF1CMFQW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
