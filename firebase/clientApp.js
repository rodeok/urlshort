import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Your Firebase configuration goes here
  apiKey: "AIzaSyCLx6lyqLBSVTo51QS0gsJgSitX1ytV3gU",
  authDomain: "auth-19e91.firebaseapp.com",
  projectId: "auth-19e91",
  storageBucket: "auth-19e91.appspot.com",
  messagingSenderId: "265118234743",
  appId: "1:265118234743:web:b266fa532d567ad3bfee72",
  measurementId: "G-606HB7WR3T"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;