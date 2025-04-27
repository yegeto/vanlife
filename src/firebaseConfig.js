// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCflB-4x1y8w_L9MJjexe3mt8nMfFVtNLw",
  authDomain: "vanlife-6c1a1.firebaseapp.com",
  projectId: "vanlife-6c1a1",
  storageBucket: "vanlife-6c1a1.firebasestorage.app",
  messagingSenderId: "825173246394",
  appId: "1:825173246394:web:59e2f67c156f02e1615d83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
