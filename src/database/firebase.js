// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK2Gf5uvV-donkqeO7qywBgqqC3q6Y27w",
  authDomain: "ivsisapp-rn.firebaseapp.com",
  projectId: "ivsisapp-rn",
  storageBucket: "ivsisapp-rn.appspot.com",
  messagingSenderId: "919331609734",
  appId: "1:919331609734:web:9ec657439ff7919b1ec507"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default { app, db }