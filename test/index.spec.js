import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  sigInWithGoogle, updateOutput, createUser, loginUser,
} from '../src/lib/index.js'; // Importa la función
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
  sendEmailVerification: jest.fn(() => Promise.resolve({})),
  signInWithEmailAndPassword: jest.fn(() => Promise.resolve({})),
}));

describe('updateOutput', () => {
  it('should be a function', () => {
    expect(typeof updateOutput).toBe('function');
  });
  it('should not update outputElement textContent with message if outputElement is null', () => {
    const outputElement = null;
    const message = 'Hola';
    updateOutput(outputElement, message);
    expect(outputElement).toBe(null);
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
  it('should create a user and send email verification', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const element = document.createElement('p');
    createUserWithEmailAndPassword.mockResolvedValueOnce({});
    auth.signOut.mockReturnValueOnce({});
    sendEmailVerification.mockResolvedValueOnce({});
    await createUser(email, password, element);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(auth.signOut).toHaveBeenCalled();
    expect(sendEmailVerification).toHaveBeenCalled();
  });
  it('should return error if fails', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const element = document.createElement('p');
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('error'));
    try {
      await createUser(email, password, element);
    } catch (error) {
      expect(error).toEqual(new Error('error'));
    }
  });
  it('should update element textContent if error is auth/email-already-in-use', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const element = document.createElement('p');
    createUserWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/email-already-in-use' });
    await createUser(email, password, element);
    expect(element.textContent).toBe('El correo ya está en uso.');
  });
  it('should update element textContent if error is auth/invalid-email', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const element = document.createElement('p');
    createUserWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/invalid-email' });
    await createUser(email, password, element);
    expect(element.textContent).toBe('El correo no es válido.');
  });
  it('should update element textContent if error is auth/weak-password', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const element = document.createElement('p');
    createUserWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/weak-password' });
    await createUser(email, password, element);
    expect(element.textContent).toBe('La contraseña es muy débil.');
  });
});

describe('loginUser', () => {
  it('should be a function', () => {
    expect(typeof loginUser).toBe('function');
  });
  it('should receive email, password and element as arguments', () => {
    expect(loginUser).toHaveLength(3);
  });
  it('should call signInWithEmailAndPassword with auth, email and password', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    await loginUser(email, password);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
  });
  it('should return user if success', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    signInWithEmailAndPassword.mockResolvedValueOnce({});
    const user = await loginUser(email, password);
    expect(user).toEqual({});
  });
  it('should return error if fails', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('error'));
    try {
      await loginUser(email, password);
    } catch (error) {
      expect(error).toEqual(new Error('error'));
    }
  });
  it('should update element textContent if error is auth/invalid-email', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const element = document.createElement('p');
    signInWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/invalid-email' });
    await loginUser(email, password, element);
    expect(element.textContent).toBe('El correo no es válido.');
  });
  it('should update element textContent if error is auth/user-disabled', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const element = document.createElement('p');
    signInWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/user-disabled' });
    await loginUser(email, password, element);
    expect(element.textContent).toBe('El usuario ha sido deshabilitado.');
  });
  it('should update element textContent if error is auth/user-not-found', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const element = document.createElement('p');
    signInWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/user-not-found' });
    await loginUser(email, password, element);
    expect(element.textContent).toBe('El usuario no existe.');
  });
  it('should update element textContent if error is auth/wrong-password', async () => {
    const email = 'test@example.com';
    const password = 'testpassword';
    const element = document.createElement('p');
    signInWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/wrong-password' });
    await loginUser(email, password, element);
    expect(element.textContent).toBe('La contraseña es incorrecta.');
    });
});