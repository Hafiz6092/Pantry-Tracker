// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Correct the import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBVvpiuirCvItnx8TTlqEui7408VIctHE",
  authDomain: "pantry-tracker-bf461.firebaseapp.com",
  projectId: "pantry-tracker-bf461",
  storageBucket: "pantry-tracker-bf461.appspot.com",
  messagingSenderId: "959301114216",
  appId: "1:959301114216:web:4c1302bc8353ca3c7e9edd",
  measurementId: "G-R30WECW2TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Correct the initialization

export { firestore }; // Correct export
