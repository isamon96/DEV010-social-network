import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // Servicio de autenticación
import { getFirestore } from 'firebase/firestore'; // Servicio de base de datos
// importa las fx necesarias de la biblioteca Firebase para inicializar una aplicación,
// obtener el servicio de autenticación y el servicio de base de datos

const firebaseConfig = {
  // define un objeto que contiene la configurción necesaria para conectar una app con firebase
  apiKey: 'AIzaSyCoGmbTy2vNte1Lju2vk-lRx0yF5NvOaPU',
  authDomain: 'dev010-social-network-c83f9.firebaseapp.com',
  projectId: 'dev010-social-network-c83f9',
  storageBucket: 'dev010-social-network-c83f9.appspot.com',
  messagingSenderId: '67526430911',
  appId: '1:67526430911:web:28f0c127c6064f2834360a',
  measurementId: 'G-KELY29X5TF',
};

const app = initializeApp(firebaseConfig);
// crea una instancia de la aplicación Firebase utilizando la config proporcionada en el objeto
// permite establecer una conexión entre la aplicación y Firebase

const auth = getAuth(app);
// obtiene el servicio de autenticación de Firebase utilizando la instancia de la app
// la variable auth se utiliza para acceder a las funciones y mñetodos proporcionados

const db = getFirestore(app);
// obtiene el servicio de base de datos de Firebase utilizando la instancia de la app
// permite interactuar con la base de datos de Firebase

export { auth, db };

// plataforma de desarrollo de aplicaciones móviles y web de Google
// que ofrece una amplia gama de servicios en la nube
// para simplificar el desarrollo y el crecimiento de aplicaciones
