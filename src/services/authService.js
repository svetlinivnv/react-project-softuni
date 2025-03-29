import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  reload,
} from "firebase/auth";


const registerUser = async (email, password, username) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await updateProfile(user, { 
    displayName: username
  });

  return userCredential;
}

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = () => {
  return signOut(auth);
};

const authStateListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  authStateListener
}