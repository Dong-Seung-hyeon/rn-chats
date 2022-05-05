import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAZa98BWH1jGXMNvtTzD-wGf4Hbjbgkqh0',
  authDomain: 'rn-chat-1f941.firebaseapp.com',
  databaseURL: 'https://rn-chat-1f941-default-rtdb.firebaseio.com',
  projectId: 'rn-chat-1f941',
  storageBucket: 'rn-chat-1f941.appspot.com',
  messagingSenderId: '293554822855',
  appId: '1:293554822855:web:785a89c24b7ac7bb7768e2',
  measurementId: 'G-KRKJKMVF9H',
};

// init firebase app
export const app = initializeApp(firebaseConfig);
