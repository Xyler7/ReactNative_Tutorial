import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDgB0ekLwwv3n-Bl-l91EZ9o2w2fpGJR1M",
  authDomain: "derscalisiyom-110c8.firebaseapp.com",
  projectId: "derscalisiyom-110c8",
  storageBucket: "derscalisiyom-110c8.appspot.com",
  messagingSenderId: "781002143568",
  appId: "1:781002143568:web:cc7a48dac1ad8f87509e55"
 };

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const auth = getApps().length === 0
  ? initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    })
  : getAuth(app);

const db = getFirestore(app);

export { auth, db, app };
