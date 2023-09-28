import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  // updateProfile,
} from 'firebase/auth';

import {
  addDoc, // collection, getDocs, query, orderBy,
} from 'firebase/firestore';

import {
  sigInWithGoogle,
  updateOutput,
  createUser,
  loginUser,
  addPost,
  getPosts,
  showPosts,
  updateDisplayName,
} from '../src/lib/index.js';

import { auth, db } from '../src/firebase.js';

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

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => Promise.resolve({})),
  addDoc: jest.fn(() => Promise.resolve({ id: 'fake-id' })),
  collection: jest.fn(() => Promise.resolve({})),
  db: jest.fn(() => Promise.resolve({})),
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

describe('addPost', () => {
  it('should be a function', () => {
    expect(typeof addPost).toBe('function');
  });
  it('should receive title and post as arguments', () => {
    expect(addPost).toHaveLength(2);
  });
  it('name should be equal to auth.currentUser.displayName', async () => {
    const name = auth.currentUser.displayName;
    expect(name).toBe(auth.currentUser.displayName);
  });
  it('should call addDoc with postsCollection and object with name, date, title and post', async () => {
    const title = 'test title';
    const post = 'test post';
    const name = auth.currentUser.displayName;
    const date = 'test date';
    const postsCollection = (db, 'posts');
    const object = {
      name,
      date,
      title,
      post,
    };
    await addPost(title, post);
    expect(addDoc).toHaveBeenCalledWith(postsCollection, object);
  });
});

describe('getPosts', () => {
  it('should be a function', () => {
    expect(typeof getPosts).toBe('function');
  });
  it('should not receive arguments', () => {
    expect(getPosts).toHaveLength(0);
  });
});

describe('showPosts', () => {
  it('should be a function', () => {
    expect(typeof showPosts).toBe('function');
  });
  it('should receive array as argument', () => {
    expect(showPosts).toHaveLength(1);
  });
});

describe('updateDisplayName', () => {
  it('should be a function', () => {
    expect(typeof updateDisplayName).toBe('function');
  });
  it('should receive newDisplayName as argument', () => {
    expect(updateDisplayName).toHaveLength(1);
  });
});
