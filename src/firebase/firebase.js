import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
  apiKey: "AIzaSyDuAUo47P1udXi694UrQT8_WyGeZYSkNIA",
    authDomain: "authentication-efba4.firebaseapp.com",
    databaseURL: "https://authentication-efba4.firebaseio.com",
    projectId: "authentication-efba4",
    storageBucket: "authentication-efba4.appspot.com",
    messagingSenderId: "549518179075",
    serviceAccount: './testapp.json'
};

const devConfig = {
  apiKey: "AIzaSyDuAUo47P1udXi694UrQT8_WyGeZYSkNIA",
    authDomain: "authentication-efba4.firebaseapp.com",
    databaseURL: "https://authentication-efba4.firebaseio.com",
    projectId: "authentication-efba4",
    storageBucket: "authentication-efba4.appspot.com",
    messagingSenderId: "549518179075",
    serviceAccount: './testapp.json'
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();
export {
  db,
  auth,
};
