import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../firebase';

const sigInWithGoogle = async (event) => {
  event.preventDefault();
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = (userCredential);
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      alert('Usuario creado');
      auth.signOut();
      sendEmailVerification(auth.currentUser).then(() => {
        alert('Se envió un correo de verificación');
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        alert('El correo ya está en uso');
      } else if (errorCode === 'auth/invalid-email') {
        alert('El correo no es válido');
      } else if (errorCode === 'auth/weak-password') {
        alert('La contraseña es muy débil');
      }
    });
};

const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('Usuario logueado');
      console.log(userCredential);
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        alert('El correo no es válido');
      } else if (errorCode === 'auth/user-disabled') {
        alert('El usuario está deshabilitado');
      } else if (errorCode === 'auth/user-not-found') {
        alert('El usuario no existe');
      } else if (errorCode === 'auth/wrong-password') {
        alert('La contraseña es incorrecta');
      }
    });
};

export {
  sigInWithGoogle, createUser, loginUser,
};
