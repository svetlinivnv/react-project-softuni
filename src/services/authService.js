import { auth } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  updatePassword,
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

const updateUserProfile = async (user, { username, newPassword }) => {
  if (username && username !== user.displayName) {
    await updateProfile(user, { displayName: username });
  }

  if (newPassword) {
    await updatePassword(user, newPassword);
  }

  await reload(user);
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  authStateListener,
  updateUserProfile
}