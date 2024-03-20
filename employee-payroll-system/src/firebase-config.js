// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8sO-3-8Vjxa4APRXed8GhLCadS-fOuwo",
  authDomain: "employee-payroll-system-33ec0.firebaseapp.com",
  projectId: "employee-payroll-system-33ec0",
  storageBucket: "employee-payroll-system-33ec0.appspot.com",
  messagingSenderId: "1073998092498",
  appId: "1:1073998092498:web:ba714d4ddd98d14977b50b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
