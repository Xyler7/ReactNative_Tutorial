import { initializeApp } from 'firebase/app';
import {
 initializeAuth,
 getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDgB0ekLwwv3n-Bl-l91EZ9o2w2fpGJR1M",
  authDomain: "derscalisiyom-110c8.firebaseapp.com",
  projectId: "derscalisiyom-110c8",
  storageBucket: "derscalisiyom-110c8.firebasestorage.app",
  messagingSenderId: "781002143568",
  appId: "1:781002143568:web:cc7a48dac1ad8f87509e55"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
 persistence: getReactNativePersistence(AsyncStorage),
});
export { app, auth };
