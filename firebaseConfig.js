// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2XuJKPuUZy52sD9Z_3v4RXwGv-rweZBE",
  authDomain: "test-app-4645d.firebaseapp.com",
  projectId: "test-app-4645d",
  storageBucket: "test-app-4645d.firebasestorage.app",
  messagingSenderId: "14067910926",
  appId: "1:14067910926:web:3b1974f58b37516bac2f5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default app;