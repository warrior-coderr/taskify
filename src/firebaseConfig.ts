import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC-aOz8qXai7-eYepT5dzc___YF4JDb5rI",
  authDomain: "taskifysmartapp.firebaseapp.com",
  projectId: "taskifysmartapp",
  storageBucket: "taskifysmartapp.firebasestorage.app",
  messagingSenderId: "597340975296",
  appId: "1:597340975296:web:1162a5113d7e8d79b2fd25",
  measurementId: "G-N4EJ2XGRZB"
};

const app = initializeApp(firebaseConfig);
export const db: Firestore = getFirestore(app);
