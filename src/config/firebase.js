import firebase from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import "firebase/storage";
import "firebase/auth";
import "firebase/firestore";
import "firebase/messaging";

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
const messaging = firebase.messaging();


export const getToken = (setTokenFound) => {
  return messaging.getToken({ vapidKey: 'BOCCW2hgSeYQG0S__Bah0t_AaWDub1y8XbKV_uas3FTs61lt6LEKNSUG01yIly4L4AuYZ-muQO0GWlDG3lnC9wk' }).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});

export { storage, auth, firestore };
