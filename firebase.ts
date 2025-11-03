// FIX: Corrected firebase import paths
import { initializeApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";
import { getDatabase } from "@firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL6-45uWfOnfWFMyy6m_BrJFQzteqv0SM",
  authDomain: "studio-459716806-f8b73.firebaseapp.com",
  databaseURL: "https://studio-459716806-f8b73-default-rtdb.firebaseio.com",
  projectId: "studio-459716806-f8b73",
  storageBucket: "studio-459716806-f8b73.firebasestorage.app",
  messagingSenderId: "976268963893",
  appId: "1:976268963893:web:a1f14c5c58c6010395017c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

// Initialize Firebase Realtime Database and export it
export const database = getDatabase(app);
