
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth}  from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAEB3AyoJkZ_p_IDHX52jmPKFOaOdPNgYI",
  authDomain: "web-diary-51e78.firebaseapp.com",
  projectId: "web-diary-51e78",
  storageBucket: "gs://web-diary-51e78.appspot.com/",
  messagingSenderId: "968580365681",
  appId: "1:968580365681:web:c1a33873a1d16efc924ad0",
  measurementId: "G-XPWHBT3PWV",
  databaseURL:"https://web-diary-51e78-default-rtdb.asia-southeast1.firebasedatabase.app/"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
export const db = getFirestore(app);