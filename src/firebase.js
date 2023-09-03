//Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCoGmbTy2vNte1Lju2vk-lRx0yF5NvOaPU',
  authDomain: 'dev010-social-network-c83f9.firebaseapp.com',
  projectId: 'dev010-social-network-c83f9',
  storageBucket: 'dev010-social-network-c83f9.appspot.com',
  messagingSenderId: '67526430911',
  appId: '1:67526430911:web:28f0c127c6064f2834360a',
  measurementId: 'G-KELY29X5TF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

// Obtén una referencia a tu base de datos Firestore
// eslint-disable-next-line no-unused-vars
const db = getFirestore();

// Ahora puedes utilizar "db" para acceder a las colecciones y documentos en tu base de datos