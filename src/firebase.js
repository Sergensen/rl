import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA7mD-qtYz-NXmuWGg2gZwMTULey6Ii21s",
    authDomain: "rl-counter.firebaseapp.com",
    databaseURL: "https://rl-counter.firebaseio.com",
    projectId: "rl-counter",
    storageBucket: "rl-counter.appspot.com",
    messagingSenderId: "498181417016",
    appId: "1:498181417016:web:a1f52a7ac2f1d174831ecd",
    measurementId: "G-N2H7GBDDJP"
  };

firebase.initializeApp(config);
firebase.auth().signInAnonymously();
export default firebase;