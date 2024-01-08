
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth}  from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsk7m5IjrCEewi6k-rcNXi2xj7qEW1ipA",
  authDomain: "web-diary-3.firebaseapp.com",
  projectId: "web-diary-3",
  storageBucket: "web-diary-3.appspot.com",
  messagingSenderId: "190841612688",
  appId: "1:190841612688:web:3ee3b2a587eb8da101eb15",
  measurementId: "G-W2HPG1PKW6"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const db = getFirestore(app);
