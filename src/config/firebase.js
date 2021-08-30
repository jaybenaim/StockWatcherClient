import firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyAPKBvgxHlWj_eLvlzux99pkgKekYgk-WQ",
  authDomain: "stock-watcher-7b087.firebaseapp.com",
  databaseURL: "https://stock-watcher-7b087-default-rtdb.firebaseio.com/",
  projectId: "stock-watcher-7b087",
  storageBucket: "stock-watcher-7b087.appspot.com",
  messagingSenderId: "919980135889",
  appId: "1:919980135889:web:6cac8ef1ef7e9efca33cf0",
  measurementId: "G-X0483QH77X",
};


console.log(firebaseConfig)
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// analytics is optional
// firebase.analytics();
// const analytics = getAnalytics(app);

const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
export { storage, auth, firestore };
