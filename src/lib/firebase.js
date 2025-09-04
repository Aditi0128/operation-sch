// Firebase configuration for free plan — no storage
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWImhqR_btGi3H_zkiLRJW5kojO-DWA3s",
  authDomain: "operation-sch.firebaseapp.com",
  projectId: "operation-sch",
  storageBucket: "operation-sch.firebasestorage.app",
  messagingSenderId: "277838709899",
  appId: "1:277838709899:web:aa93ddc71c3beaaa33408e",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
