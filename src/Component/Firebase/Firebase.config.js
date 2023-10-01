// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUiESwaYQ9Ltz4lUbCTe6LthL3kFaqs1Y",
  authDomain: "user-email-password-auth-c3269.firebaseapp.com",
  projectId: "user-email-password-auth-c3269",
  storageBucket: "user-email-password-auth-c3269.appspot.com",
  messagingSenderId: "390739804566",
  appId: "1:390739804566:web:8d187451569dd409531db7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
