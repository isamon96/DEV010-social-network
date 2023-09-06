import {
  sigInWithGoogle,
  loginUser,
  createUser,
} from '../src/lib/index.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';

describe('sigInWithGoogle', () => {
  it('debería ser una función', () => {
    expect(typeof sigInWithGoogle).toBe('function');
  });
  it('debería poder iniciar sesión con google', () => {
    const event = {
      preventDefault: () => {},
    };
    sigInWithGoogle(event);
  });
});

describe('loginUser', () => {
  it('debería ser una función', () => {
    expect(typeof loginUser).toBe('function');
  });
});

describe('createUser', () => {
  it('debería ser una función', () => {
    expect(typeof createUser).toBe('function');
  });
});
