import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";

// TODO: Replace with environment variables in production
const firebaseConfig = {
  apiKey: "AIzaSyDGn6POds8COn1LSeBfxcW_TIQ9ohJTF74",
  authDomain: "studdybuddy-4dac7.firebaseapp.com",
  projectId: "studdybuddy-4dac7",
  storageBucket: "studdybuddy-4dac7.firebasestorage.app",
  messagingSenderId: "402500668132",
  appId: "1:402500668132:web:64d1cc542ef6f304fb7af1",
  measurementId: "G-171QJBX4WZ"
};

// Initialize Firebase (singleton pattern)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Analytics (client-side only)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, auth, db, storage, analytics };
