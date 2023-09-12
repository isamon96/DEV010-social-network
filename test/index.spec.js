import {
  signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification,
} from 'firebase/auth';
import { sigInWithGoogle, updateOutput, createUser } from '../src/lib/index.js'; // Importa la función
import { auth } from '../src/firebase.js'; // Importa la instancia de Firebase auth

jest.mock('firebase/auth', () => ({
  signInWithPopup: jest.fn(),
  getAuth: jest.fn(() => ({
    currentUser: {
      emailVerified: false,
    },
    signOut: jest.fn(),
  })),
  GoogleAuthProvider: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
  auth: jest.fn(() => Promise.resolve({})),
}));

describe('updateOutput', () => {
  it('should be a function', () => {
    expect(typeof updateOutput).toBe('function');
  });
  it('should update outputElement textContent with message', () => {
    const outputElement = document.createElement('p');
    const message = 'Hola';
    updateOutput(outputElement, message);
    expect(outputElement.textContent).toBe(message);
  });
});

describe('SigInWithGoogle', () => {
  it('should be a function', () => {
    expect(typeof sigInWithGoogle).toBe('function');
  });
  it('it should call sigInWithPopUp', async () => {
    const event = { preventDefault: jest.fn() };
    await sigInWithGoogle(event);
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
  it('it should call sigInWithPopUp with GoogleAuthProvider and auth as arguments', async () => {
    const event = { preventDefault: jest.fn() };
    await sigInWithGoogle(event);
    expect(signInWithPopup).toHaveBeenCalledWith(auth, new GoogleAuthProvider());
  });
  it('should return user if success', async () => {
    const event = { preventDefault: jest.fn() };
    signInWithPopup.mockResolvedValueOnce({});
    const user = await sigInWithGoogle(event);
    expect(user).toEqual({});
  });
  it('should return error if fails', async () => {
    const event = { preventDefault: jest.fn() };
    signInWithPopup.mockRejectedValueOnce(new Error('error'));
    const error = await sigInWithGoogle(event);
    expect(error).toEqual(new Error('error'));
  });
});

/* const createUser = (email, password, element) => {
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
}; */

describe('createUser', () => {
  it('should be a function', () => {
    expect(typeof createUser).toBe('function');
  });
  it('should receive email, password and element as arguments', () => {
    expect(createUser).toHaveLength(3);
  });
  it('should call createUserWithEmailAndPassword 1 time', () => {
    const element2 = document.createElement('p');
    createUserWithEmailAndPassword.mockResolvedValueOnce({});
    createUser('email', 'password', element2);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
  it('should call auth.signOut 1 time if success', () => {
    const element2 = document.createElement('p');
    createUserWithEmailAndPassword.mockResolvedValueOnce({});
    auth.signOut.mockReturnValueOnce({});
    createUser('email', 'password', element2);
    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });
  // deberia llamar a sendEmailVerification 1 vez si es exitoso //MUESTRA ERROR AL CORRER TEST
  it('should call sendEmailVerification 1 time if success', () => {
    const element2 = document.createElement('p');
    createUserWithEmailAndPassword.mockResolvedValueOnce({});
    auth.signOut.mockReturnValueOnce({});
    sendEmailVerification.mockResolvedValueOnce({});
    createUser('email', 'password', element2);
    expect(sendEmailVerification).toHaveBeenCalledTimes(1);
  });
});
