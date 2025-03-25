import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

// Register User
const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Login User
const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Logout User
const logoutUser = () => {
  return signOut(auth);
};

// Listen to Authentication State
const authStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  authStateListener
}