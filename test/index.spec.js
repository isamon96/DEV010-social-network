/* eslint-disable max-len */
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  // onAuthStateChanged,
} from 'firebase/auth';

import {
  addDoc, collection, getDocs, query, orderBy, doc, deleteDoc, updateDoc, getDoc,
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
  formatDate,
  deletePost,
  editPost,
  resetPassword,
  toggleLike,
  signOutUser,
  obtainUserInfo,
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
  signOut: jest.fn(() => Promise.resolve({})),
  updateProfile: jest.fn(() => Promise.resolve({})),
  sendPasswordResetEmail: jest.fn(() => Promise.resolve({})),
  onAuthStateChanged: jest.fn(() => Promise.resolve({})),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(() => Promise.resolve({})),
  addDoc: jest.fn(() => Promise.resolve({ id: 'fake-id' })),
  collection: jest.fn(() => Promise.resolve({})),
  db: jest.fn(() => Promise.resolve({})),
  query: jest.fn(() => Promise.resolve({})),
  orderBy: jest.fn(() => Promise.resolve({})),
  getDocs: jest.fn(() => Promise.resolve({})),
  doc: jest.fn(() => Promise.resolve({})),
  deleteDoc: jest.fn(() => Promise.resolve({})),
  updateDoc: jest.fn(() => Promise.resolve({})),
  getDoc: jest.fn(() => Promise.resolve({})),
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
    const user = { uid: '123', displayName: 'John Doe', email: 'johndoe@example.com' };
    signInWithPopup.mockResolvedValueOnce({ user });
    const result = await sigInWithGoogle(event);
    expect(result).toEqual(user);
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
  it('updates the display name successfully and returns true', async () => {
    updateProfile.mockResolvedValueOnce();
    const result = await updateDisplayName('NewName');
    expect(result).toBe(true);
    expect(updateProfile).toHaveBeenCalledWith(auth.currentUser, {
      displayName: 'NewName',
    });
  });

  it('handles errors and returns the error object', async () => {
    const error = new Error('Something went wrong');
    updateProfile.mockRejectedValueOnce(error);
    const result = await updateDisplayName('NewName');
    expect(result).toBe(error);
  });
});
describe('formatDate', () => {
  it('should be a function', () => {
    expect(typeof formatDate).toBe('function');
  });
  it('should receive date as argument', () => {
    expect(formatDate).toHaveLength(1);
  });
  it('should return date in format year-month-day hour:minute', () => {
    const date = new Date('2021-08-31T18:00:00');
    const result = formatDate(date);
    expect(result).toBe('August 31, 2021 at 6:00 PM');
  });
});
describe('addPost', () => {
  it('should be a function', () => {
    expect(typeof addPost).toBe('function');
  });
  it('should receive title and post as arguments', () => {
    expect(addPost).toHaveLength(2);
  });
  it('should call addDoc with postsCollection and the correct object', async () => {
    const postsCollection = 'mockedPostsCollection';
    collection.mockReturnValue(postsCollection);
    const options = {
      year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
    };
    const title = 'Test Title';
    const post = 'Test Post';
    const date = new Date().toLocaleString('en-US', options);
    const name = auth.currentUser.displayName;
    const likes = [];
    const userId = auth.currentUser.uid;
    await addPost(title, post);
    expect(addDoc).toHaveBeenCalledWith(postsCollection, {
      name,
      date,
      title,
      post,
      userId,
      likes,
            userId,
      likes,
    });
  });
});
describe('getPosts', () => {
  it('should be a function', () => {
    expect(typeof getPosts).toBe('function');
  });
  it('should fetch posts from Firestore', async () => {
    const postsCollection = 'mockedPostsCollection';
    collection.mockReturnValue(postsCollection);
    const orderByField = 'date';
    const orderDirection = 'desc';
    const orderByMock = orderBy(orderByField, orderDirection);
    const q = query(postsCollection, orderByMock);
    query.mockReturnValue(q);
    const mockPostData1 = { title: 'Post 1', date: '2023-10-05' };
    const mockPostData2 = { title: 'Post 2', date: '2023-10-04' };
    const mockPostsQuery = [
      { data: () => mockPostData1, id: '1' },
      { data: () => mockPostData2, id: '2' },
    ];
    getDocs.mockResolvedValue(mockPostsQuery);
    const result = await getPosts();
    expect(collection).toHaveBeenCalledWith(db, 'posts');
    expect(query).toHaveBeenCalledWith(postsCollection, orderByMock);
    expect(getDocs).toHaveBeenCalledWith(q);
    expect(result).toEqual([
      { ...mockPostData1, id: '1' },
      { ...mockPostData2, id: '2' },
    ]);
  });
});
describe('deletePost', () => {
  it('should be a function', () => {
    expect(typeof deletePost).toBe('function');
  });
  it('should receive id as argument', () => {
    expect(deletePost).toHaveLength(1);
  });
  it('should delete a post from Firestore', async () => {
    const postId = 'mockedPostId';
    const postDoc = 'mockedPostDoc';
    doc.mockReturnValue(postDoc);
    await deletePost(postId);
    expect(doc).toHaveBeenCalledWith(db, 'posts', postId);
    expect(deleteDoc).toHaveBeenCalledWith(postDoc);
  });
});
describe('editPost', () => {
  it('should be a function', () => {
    expect(typeof editPost).toBe('function');
  });
  it('should receive id, title, post and likes as arguments', () => {
    expect(editPost).toHaveLength(4);
  });
  it('should edit a post in Firestore', async () => {
    const postId = 'mockedPostId';
    const postRef = 'mockedPostRef';
    doc.mockReturnValue(postRef);
    const existingData = { title: 'Old Title', post: 'Old Post', likes: ['user1', 'user2'] };
    getDoc.mockResolvedValue({ data: () => existingData });
    const newTitle = 'New Title';
    const newPost = 'New Post';
    const newLikes = ['user3', 'user4'];
    await editPost(postId, newTitle, newPost, newLikes);
    expect(doc).toHaveBeenCalledWith(db, 'posts', postId);
    expect(getDoc).toHaveBeenCalledWith(postRef);
    const expectedDataToUpdate = {
      title: newTitle,
      post: newPost,
      likes: newLikes,
    };
    expect(updateDoc).toHaveBeenCalledWith(postRef, expectedDataToUpdate);
  });
  it('should edit a post with an undefined fields', async () => {
    const postId = 'test-post-id';
    const title = 'New Title';
    const post = 'New Post';
    const likes = ['user3', 'user4'];
    const existingData = {
      title: 'Old Title',
      post: 'Existing Post',
      likes: ['user1', 'user2'],
    };
    const postRef = doc(db, 'posts', postId);
    const dataToUpdate = {
      title,
      post,
      likes,
    };
    updateDoc.mockReturnValue(Promise.resolve());
    await editPost(postId, title, post, likes, existingData);
    expect(updateDoc).toHaveBeenCalledWith(postRef, dataToUpdate);
  });
});
describe('toggleLike', () => {
  it('should be a function', () => {
    expect(typeof toggleLike).toBe('function');
  });
  it('should receive id and element as arguments', () => {
    expect(toggleLike).toHaveLength(2);
  });
  it('should toggle like', async () => {
    const postId = 'test-post-id';
    const element = document.createElement('p');
    const currentUser = auth.currentUser.uid;
    const postRef = doc(db, 'posts', postId);
    const postDoc = { exists: true, data: () => ({ likes: ['user1', 'user2'] }) };
    getDoc.mockResolvedValue(postDoc);
    const updatedLikes = ['user1', 'user2', currentUser];
    const expectedDataToUpdate = {
      likes: updatedLikes,
    };
    await toggleLike(postId, element);
    expect(getDoc).toHaveBeenCalledWith(postRef);
    expect(updateDoc).toHaveBeenCalledWith(postRef, expectedDataToUpdate);
    expect(element.textContent).toBe('3');
  });
  it('should toggle unlike', async () => {
    const postId = 'test-post-id';
    const element = document.createElement('p');
    const currentUser = auth.currentUser.uid;
    const postRef = doc(db, 'posts', postId);
    const postDoc = { exists: true, data: () => ({ likes: ['user1', 'user2', currentUser] }) };
    getDoc.mockResolvedValue(postDoc);
    const updatedLikes = ['user1', 'user2'];
    const expectedDataToUpdate = {
      likes: updatedLikes,
    };
    await toggleLike(postId, element);
    expect(getDoc).toHaveBeenCalledWith(postRef);
    expect(updateDoc).toHaveBeenCalledWith(postRef, expectedDataToUpdate);
    expect(element.textContent).toBe('2');
  });
  it('should return false if post does not exist', async () => {
    const postId = 'test-post-id';
    const element = document.createElement('p');
    const postRef = doc(db, 'posts', postId);
    const postDoc = { exists: false };
    getDoc.mockResolvedValue(postDoc);
    const result = await toggleLike(postId, element);
    expect(getDoc).toHaveBeenCalledWith(postRef);
    expect(result).toBe(false);
  });
});
describe('signOutUser', () => {
  it('should be a function', () => {
    expect(typeof signOutUser).toBe('function');
  });
  it('should return true if success', async () => {
    signOut.mockResolvedValueOnce();
    const result = await signOutUser()();
    expect(result).toBe(true);
  });

  it('should return error if fails', async () => {
    const error = new Error('Algo salió mal');
    signOut.mockRejectedValueOnce(error);
    const result = await signOutUser()();
    expect(result).toBe(error);
  });
});
describe('resetPassword', () => {
  it('should be a function', () => {
    expect(typeof createUser).toBe('function');
  });
  it('should receive email and element as arguments', () => {
    expect(resetPassword).toHaveLength(2);
  });
  it('should call sendPasswordResetEmail with auth and email', async () => {
    const email = 'user@email.com';
    const element = document.createElement('p');
    await resetPassword(email, element);
    expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, email);
  });
  it('should update element textContent if error is auth/invalid-email', async () => {
    const email = 'user@email.com';
    const element = document.createElement('p');
    sendPasswordResetEmail.mockRejectedValueOnce({ code: 'auth/invalid-email' });
    await resetPassword(email, element);
    expect(element.textContent).toBe('El correo no es válido.');
  });
  it('should update element textContent if error is auth/user-not-found', async () => {
    const email = 'user@email.com';
    const element = document.createElement('p');
    sendPasswordResetEmail.mockRejectedValueOnce({ code: 'auth/user-not-found' });
    await resetPassword(email, element);
    expect(element.textContent).toBe('El usuario no existe.');
  });
});
describe('obtainUserInfo', () => {
  it('should be a function', () => {
    expect(typeof obtainUserInfo).toBe('function');
  });
});
