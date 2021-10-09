import firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBucy-UeTjedwPID39714EAHoA9R3H_GGs",
  authDomain: "stockwatcher-67aec.firebaseapp.com",
  databaseURL: "https://stockwatcher-67aec-default-rtdb.firebaseio.com/",
  projectId: "stockwatcher-67aec",
  storageBucket: "stockwatcher-67aec.appspot.com",
  messagingSenderId: "422151887884",
  appId: "1:422151887884:web:0b404f26f816da3d81a229",
  measurementId: "G-HDMT81EJ18",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// analytics is optional
// firebase.analytics();
// const analytics = getAnalytics(app);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export { storage, auth, firestore };
