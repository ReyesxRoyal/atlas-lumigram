// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePresistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage, ref } from "firebase/storage";
import { ReactNativeAsyncStorage } from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSthpfmYX9cE7bxQSn8yWvVCQupsYL1w0",
  authDomain: "lumigram-46afc.firebaseapp.com",
  projectId: "lumigram-46afc",
  storageBucket: "lumigram-46afc.firebasestorage.app",
  messagingSenderId: "69375141757",
  appId: "1:69375141757:web:19f6854dbd03861cff8e14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePresistence(ReactNativeAsyncStorage)
});
export const storage = getStorage(app);
export const db = getFirestore(app);