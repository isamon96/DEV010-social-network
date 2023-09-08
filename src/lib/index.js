import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '../firebase';

const updateOutput = (outputElement, message) => {
  if (outputElement) {
    outputElement.textContent = message;
  }
};

const sigInWithGoogle = async (event) => {
  event.preventDefault();
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const user = (userCredential);
    return user;
  } catch (error) {
    return error;
  }
};

const createUser = (email, password, element) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      auth.signOut();
      sendEmailVerification(auth.currentUser).then(() => {
        const message = 'Usuario creado, revisa tu correo para verificar tu cuenta.';
        updateOutput(element, message);
      });
      return userCredential;
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        const message = 'El correo ya está en uso.';
        updateOutput(element, message);
      } else if (errorCode === 'auth/invalid-email') {
        const message = 'El correo no es válido.';
        updateOutput(element, message);
      } else if (errorCode === 'auth/weak-password') {
        const message = 'La contraseña es muy débil.';
        updateOutput(element, message);
      }
    });
};

const loginUser = (email, password, element) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => userCredential)
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        const message = 'El correo no es válido.';
        updateOutput(element, message);
      } else if (errorCode === 'auth/user-disabled') {
        const message = 'El usuario ha sido deshabilitado.';
        updateOutput(element, message);
      } else if (errorCode === 'auth/user-not-found') {
        const message = 'El usuario no existe.';
        updateOutput(element, message);
      } else if (errorCode === 'auth/wrong-password') {
        const message = 'La contraseña es incorrecta.';
        updateOutput(element, message);
      }
    });
};

export {
  sigInWithGoogle, createUser, loginUser, updateOutput,
};
