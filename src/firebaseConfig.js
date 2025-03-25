import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDdpbFoibLm_4JVhWyStq2TGYEXu3dKrDo",
    authDomain: "angular-exam-be.firebaseapp.com",
    projectId: "angular-exam-be",
    storageBucket: "angular-exam-be.firebasestorage.app",
    messagingSenderId: "404548139465",
    appId: "1:404548139465:web:3179db0297c8bcfa2b1018"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);