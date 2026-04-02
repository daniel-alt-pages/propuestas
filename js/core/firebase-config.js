import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBRCDsvLLpyer6DeX7Xtv90MQfHn_s99cw",
  authDomain: "pruebas-sg-aa586.firebaseapp.com",
  projectId: "pruebas-sg-aa586",
  storageBucket: "pruebas-sg-aa586.firebasestorage.app",
  messagingSenderId: "842270929943",
  appId: "1:842270929943:web:76ea7617aa3eaac5a49852"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
