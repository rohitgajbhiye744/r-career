// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// Replace these placeholder values with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDOL5vjRf82fbTji0QE-31uyifvRRyoNgs",
  authDomain: "r-career-fe999.firebaseapp.com",
  projectId: "r-career-fe999",
  storageBucket: "r-career-fe999.firebasestorage.app",
  messagingSenderId: "840259594760",
  appId: "1:840259594760:web:cfde656e160961204c3fbd",
  measurementId: "G-E2VE6TWNR6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Firestore and get a reference to the service
export const db = getFirestore(app);

export default app; 