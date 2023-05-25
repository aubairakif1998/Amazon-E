import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDemd9Xvcvmbkp3Uyq0xoHpSKNV9iI4TDw",
  authDomain: "clone-f6602.firebaseapp.com",
  projectId: "clone-f6602",
  storageBucket: "clone-f6602.appspot.com",
  messagingSenderId: "330593375445",
  appId: "1:330593375445:web:8166e6401ff7b08717fe5c",
  measurementId: "G-DXHH5QKQEG",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
