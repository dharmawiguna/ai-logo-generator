// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-logo-generator-3321d.firebaseapp.com",
  projectId: "ai-logo-generator-3321d",
  storageBucket: "ai-logo-generator-3321d.firebasestorage.app",
  messagingSenderId: "665572573498",
  appId: "1:665572573498:web:df80ae3ab6d478eda2d003",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
