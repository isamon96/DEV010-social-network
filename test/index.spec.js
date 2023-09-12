import {

  signInWithPopup, GoogleAuthProvider, /* createUserWithEmailAndPassword, sendEmailVerification, */
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
  createUserWithEmailAndPassword: jest.fn(),
  sendEmailVerification: jest.fn(),
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

describe('createUser', () => {
  it('should be a function', () => {
    expect(typeof createUser).toBe('function');
  });
  it('should receive email, password and element as arguments', () => {
    expect(createUser).toHaveLength(3);
  });
});
