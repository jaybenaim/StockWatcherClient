import firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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
