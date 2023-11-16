// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB-fTPV5w7_BmfxzcSDwwMf20La_GyON4",
  authDomain: "hotel-a6586.firebaseapp.com",
  projectId: "hotel-a6586",
  storageBucket: "hotel-a6586.appspot.com",
  messagingSenderId: "36783731294",
  appId: "1:36783731294:web:f295119dadf69fc644facf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;