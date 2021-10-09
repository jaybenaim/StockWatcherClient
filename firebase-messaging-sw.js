// eslint-disable-next-line
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
// eslint-disable-next-line
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

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
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload){
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
messaging.onMessage((payload) => {
  console.log('Message received. ', payload);
  // ...
});