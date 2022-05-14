import { initializeApp } from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEs0axwTl8tSmT61jmxPmiUXd4dQyvdU4",
  authDomain: "rn-catch-my-hand.firebaseapp.com",
  projectId: "rn-catch-my-hand",
  storageBucket: "rn-catch-my-hand.appspot.com",
  messagingSenderId: "625604680970",
  appId: "1:625604680970:web:d315f3d56e3dd4006f2ef3",
  measurementId: "G-P8G9T0XJS3"
};

// init firebase app
export const app = initializeApp(firebaseConfig);
