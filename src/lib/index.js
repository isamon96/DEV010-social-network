import {
GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, onAuthStateChanged,

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

// const sigInWithGoogle2 = async (event) => {
//   event.preventDefault();
//   const provider = new GoogleAuthProvider();
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       const user = result.user;
//     }).catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       const email = error.customData.email;
//       const credential = GoogleAuthProvider.credentialFromError(error);
//     });
// };

const createUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
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

// const loginUser = (email, password) => {
//   signInWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       alert('Usuario logueado');
//       console.log(userCredential);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       if (errorCode === 'auth/invalid-email') {
//         alert('El correo no es válido');
//       } else if (errorCode === 'auth/user-disabled') {
//         alert('El usuario está deshabilitado');
//       } else if (errorCode === 'auth/user-not-found') {
//         alert('El usuario no existe');
//       } else if (errorCode === 'auth/wrong-password') {
//         alert('La contraseña es incorrecta');
//       }
//     });
// };

// export {
//   sigInWithGoogle, sigInWithGoogle2, createUser, loginUser,
// };
export { sigInWithGoogle, createUser };
