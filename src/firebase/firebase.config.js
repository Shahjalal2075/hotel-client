// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5QEIcfKfcEXfIW2g0-6-LesAwMUYdkHw",
  authDomain: "hotel-1c071.firebaseapp.com",
  projectId: "hotel-1c071",
  storageBucket: "hotel-1c071.appspot.com",
  messagingSenderId: "268490961423",
  appId: "1:268490961423:web:bbffb5259ddd1e8c42a97a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;