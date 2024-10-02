// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBe5vT0zcyaMD_sAnaUeWJbbMrMADG_fyA",
  authDomain: "lab5-46f8a.firebaseapp.com",
  projectId: "lab5-46f8a",
  storageBucket: "lab5-46f8a.appspot.com",
  messagingSenderId: "87010167216",
  appId: "1:87010167216:web:e287d620cb9f403b216e75",
  measurementId: "G-1TKGPB3ESC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);