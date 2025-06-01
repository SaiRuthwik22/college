import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAnQQPuHAeBatI7biURluIJagnJbN7idOs",
  authDomain: "collegeproject-d6cac.firebaseapp.com",
  projectId: "collegeproject-d6cac",
  storageBucket: "collegeproject-d6cac.firebasestorage.app",
  messagingSenderId: "184496227264",
  appId: "1:184496227264:web:31a21369091a7b0e0cfe25",
  measurementId: "G-HX43T7LPBJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 