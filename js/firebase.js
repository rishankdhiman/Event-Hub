// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9ovouBcLsbTAHSfasHaOohkRvbUtX7Vc",
  authDomain: "calander-32da1.firebaseapp.com",
  projectId: "calander-32da1",
  storageBucket: "calander-32da1.firebasestorage.app",
  messagingSenderId: "936099568870",
  appId: "1:936099568870:web:edf5be725a3d1dfbb7af27"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
import { getStorage } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-storage.js";
export const storage = getStorage(app);
