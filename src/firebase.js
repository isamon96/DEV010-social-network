
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Servicio de autenticación
import { getFirestore } from 'firebase/firestore'; // Servicio de base de datos

const firebaseConfig = {
  apiKey: 'AIzaSyCoGmbTy2vNte1Lju2vk-lRx0yF5NvOaPU',
  authDomain: 'dev010-social-network-c83f9.firebaseapp.com',
  projectId: 'dev010-social-network-c83f9',
  storageBucket: 'dev010-social-network-c83f9.appspot.com',
  messagingSenderId: '67526430911',
  appId: '1:67526430911:web:28f0c127c6064f2834360a',
  measurementId: 'G-KELY29X5TF',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const dataBase = getFirestore(app);

export { auth, dataBase };

// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);

// Obtén una referencia a tu base de datos Firestore
// eslint-disable-next-line no-unused-vars
const db = getFirestore();

// Ahora puedes utilizar "db" para acceder a las colecciones y documentos en tu base de datos

