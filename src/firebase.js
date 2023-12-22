// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAPegLbo8p4B4n7OtNZkE228e1f4Bd-0XE",
  authDomain: "hospitalapp-27923.firebaseapp.com",
  projectId: "hospitalapp-27923",
  storageBucket: "hospitalapp-27923.appspot.com",
  messagingSenderId: "883959766518",
  appId: "1:883959766518:web:5b5c627a91bb8f53007bd7",
  measurementId: "G-GPEW955N2L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);