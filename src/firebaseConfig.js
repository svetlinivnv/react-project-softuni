import { initializeApp } from "firebase/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDdpbFoibLm_4JVhWyStq2TGYEXu3dKrDo",
    authDomain: "angular-exam-be.firebaseapp.com",
    projectId: "angular-exam-be",
    storageBucket: "angular-exam-be.firebasestorage.app",
    messagingSenderId: "404548139465",
    appId: "1:404548139465:web:3179db0297c8bcfa2b1018"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
setPersistence(auth, browserLocalPersistence);