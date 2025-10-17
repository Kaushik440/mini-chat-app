// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBLowv9oiX27IHe4wMr2IDm3ocaIJpot-U",
  authDomain: "minichatapp-91e4c.firebaseapp.com",
  databaseURL:"https://minichatapp-91e4c-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "minichatapp-91e4c",
  storageBucket: "minichatapp-91e4c.firebasestorage.app",
  messagingSenderId: "883142177773",
  appId: "1:883142177773:web:23450833e464d315d46de4",
  measurementId: "G-JYH5N1SD6Q"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
