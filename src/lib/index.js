import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  addDoc,
  collection,
  Timestamp,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';

import { db, auth } from '../firebase';

import popUpConfirm from '../components/popUpConfirm';
import popUpEditPost from '../components/popUpEditPost';

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
    const user = userCredential.user;
    localStorage.setItem('userRegistered', 'true');
    return user;
  } catch (error) {
    return error;
  }
};

// eslint-disable-next-line max-len
const createUser = (email, password, element) => createUserWithEmailAndPassword(auth, email, password)
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

const loginUser = (email, password, element) => signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    localStorage.setItem('userRegistered', 'true');
    return userCredential;
  })
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

  const addPost = async (title, post) => {
    const name = auth.currentUser.displayName;
    const userId = auth.currentUser.uid;
    const date = new Date(); // Obtiene la fecha actual en la zona horaria del usuario
    const formattedDate = formatDate(date); // Formatea la fecha
    const likes = [];
    const postsCollection = collection(db, 'posts');
    const docRef = await addDoc(postsCollection, {
      name,
      date: formattedDate,
      title,
      post,
      userId,
      likes,
    });
  return docRef;
};

// Función para formatear la fecha en un formato legible
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

const getPosts = async () => {
  const postsCollection = collection(db, 'posts');
  const q = query(postsCollection, orderBy('date', 'desc'));
  const postsQuery = await getDocs((q));
  const posts = [];
  postsQuery.forEach((postDoc) => {
    const post = postDoc.data();
    post.id = postDoc.id;
    posts.push(post);
  });
  return posts;
};

const deletePost = async (id) => {
  await deleteDoc(doc(db, 'posts', id));
};

const editPost = async (id, title, post, likes) => {
  const postRef = doc(db, 'posts', id);
  const postDoc = await getDoc(postRef);
  const existingData = postDoc.data();

  const dataToUpdate = {
    title: title !== undefined ? title : existingData.title,
    post: post !== undefined ? post : existingData.post,
  };

  if (likes !== undefined) {
    dataToUpdate.likes = likes;
  }

  await updateDoc(postRef, dataToUpdate);
};

const toggleLike = async (id, element) => {
  const postRef = doc(db, 'posts', id);
  const currentUser = auth.currentUser.uid;
  const postDoc = await getDoc(postRef);
  if (postDoc.exists()) {
    const postData = postDoc.data();
    const likes = postData.likes || [];
    const userLiked = likes.includes(currentUser);
    if (userLiked) {
      const updatedLikes = likes.filter((like) => like !== currentUser);
      await editPost(id, undefined, undefined, updatedLikes);
      const numberOfLikes = updatedLikes.length;
      element.textContent = numberOfLikes;
    } else {
      const updatedLikes = [...likes, currentUser];
      await editPost(id, undefined, undefined, updatedLikes);
      const numberOfLikes = updatedLikes.length;
      element.textContent = numberOfLikes;
    }
    return likes.length;
  }
  return false;
};

const showPosts = async (array) => {
  const postsSection = document.getElementById('postsSection');
  const currentUser = auth.currentUser.uid;
  const postsList = await getPosts();
  if (postsList) {
    postsSection.innerHTML = '';
    array.forEach((post) => {
      const postUser = post.userId;
      const postContainer = document.createElement('section');
      postContainer.className = 'postContainer';

      const postName = document.createElement('p');
      postName.textContent = post.name;

      const postDate = document.createElement('p');
      postDate.textContent = post.date;

      const postTitle = document.createElement('h3');
      postTitle.textContent = post.title;

      const postContent = document.createElement('p');
      postContent.textContent = post.post;

      const likesIcon = document.createElement('img');
      const likesNumber = document.createElement('h3');
      likesNumber.className = 'likesNumber';
      likesNumber.textContent = post.likes.length;
      likesIcon.className = 'likesIcon';
      likesIcon.src = '../assets/likes.png';
      likesIcon.addEventListener('click', async () => {
        const postId = post.id;
        const numberOfLikes = await toggleLike(postId, likesNumber);
        likesNumber.textContent = numberOfLikes;
      });

      const iconSection = document.createElement('section');
      iconSection.className = 'iconSection';

      const likesSection = document.createElement('section');
      likesSection.className = 'likesSection';
      likesSection.append(likesNumber, likesIcon);

      if (currentUser === postUser) {
        const editIcon = document.createElement('img');
        editIcon.className = 'editIcon';
        editIcon.src = '../assets/edit.png';
        editIcon.addEventListener('click', async () => {
          const editedPost = await popUpEditPost(post.title, post.post);
          const postId = post.id;
          const editedTitle = editedPost.title;
          const editedContent = editedPost.content;
          await editPost(postId, editedTitle, editedContent);
          postTitle.textContent = editedTitle;
          postContent.textContent = editedContent;
        });

        const deleteIcon = document.createElement('img');
        deleteIcon.className = 'deleteIcon';
        deleteIcon.src = '../assets/delete.png';
        deleteIcon.addEventListener('click', async () => {
          const postId = post.id;
          const confirmed = await popUpConfirm('¿Estás seguro de que quieres eliminar este post?');
          if (confirmed) {
            await deletePost(postId);
            postContainer.remove();
          }
        });

        iconSection.append(postTitle, editIcon, deleteIcon);
      } else {
        iconSection.append(postTitle);
      }

      postContainer.append(iconSection, postName, postDate, postContent, likesSection);
      postsSection.append(postContainer);
    });
  }
  return postsSection;
};

const updateDisplayName = async (newDisplayName) => {
  try {
    await updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    });
    return true;
  } catch (error) {
    return error;
  }
};

const signOutUser = () => async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    return error;
  }
};

const resetPassword = async (email, element) => {
  try {
    await sendPasswordResetEmail(auth, email);
    const message = 'Correo enviado para restablecer contraseña.';
    updateOutput(element, message);
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === 'auth/invalid-email') {
      const message = 'El correo no es válido.';
      updateOutput(element, message);
    } else if (errorCode === 'auth/user-not-found') {
      const message = 'El usuario no existe.';
      updateOutput(element, message);
    }
  }
};

const obtainUserInfo = async () => new Promise((resolve, reject) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const name = user.displayName;
      const email = user.email;
      const imgProfile = user.photoURL;
      const userId = user.uid;
      resolve({
        name, email, imgProfile, userId,
      });
    } else {
      reject(Error('No hay usuario'));
    }
  });
});

export {
  sigInWithGoogle,
  createUser,
  loginUser,
  updateOutput,
  addPost,
  getPosts,
  showPosts,
  updateDisplayName,
  signOutUser,
  deletePost,
  editPost,
  resetPassword,
  obtainUserInfo,
};