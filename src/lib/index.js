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

// La función "updateOutput" toma dos argumentos: outputElement y message.
// Su propósito es actualizar
// el contenido de un elemento HTML (outputElement)
// con el texto proporcionado en el elemento message
const updateOutput = (outputElement, message) => {
// if (outputElement) verifica si outputElement es;
// un valor válido (no es null ni undefined) antes de continuar.
  if (outputElement) {
  // Si outputElement es válido, esta línea actualiza
  // el contenido de outputElement con el texto contenido
  // en la variable message utilizando la propiedad textContent.
    outputElement.textContent = message;
  }
};
// función es asincrónica(es una fila de espera
// donde puedes seguir haciendo tareas mientras esperas la respuesta)
// y se espera que sea llamada con un objeto de evento como argumento (button clic)
const sigInWithGoogle = async (event) => {
// previene el comportamiento predeterminado del evento
  event.preventDefault();
  // Este objeto se utiliza para establecer cómo se realizará la autenticación con Google.
  const provider = new GoogleAuthProvider();
  // Se utiliza una estructura de promesa try-catch para
  // manejar errores que puedan ocurrir durante el proceso de inicio de sesión.
  try {
    const userCredential = await signInWithPopup(auth, provider);
    // Inicio de sesión exitoso, se extrae la información
    // del usuario del objeto userCredential y se almacena en la variable user.
    const user = userCredential.user;
    // "localStorage" Recordar la sesión del usuario en futuras visitas
    localStorage.setItem('userRegistered', 'true');
    return user;
  } catch (error) {
    return error;
  }
};

// Esta función toma tres argumentos: email (el correo del nuevo usuario),
// password (la contraseña)
// y element (un elemento HTML en el que se mostrarán mensajes de salida).
// eslint-disable-next-line max-len
const createUser = (email, password, element) => createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  // el objeto auth crear un nuevo usuario
    auth.signOut();
    // devuelve una promesa que se resuelve con un objeto userCredential cuando se crea el usuario.
    // utiliza la estrutura de promesas encadenadas .then para manejar el caso de éxito
    sendEmailVerification(auth.currentUser).then(() => {
    // Envía un correo electrónico de verificación al usuario actualmente autenticado.
      const message = 'Usuario creado, revisa tu correo para verificar tu cuenta.';
      updateOutput(element, message);
    });
    return userCredential;
  })
  // estructura de promesa para manejar cualquier error que pueda
  // ocurrir durante el proceso de creación del usuario.
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
// función para ingresar con correo y contraseña
const loginUser = (email, password, element) => signInWithEmailAndPassword(auth, email, password)
  // utiliza la estrutura de promesas encadenadas .then para manejar el caso de éxito
  .then((userCredential) => {
    localStorage.setItem('userRegistered', 'true');
    return userCredential;
  })
  // estructura de promesa para manejar cualquier error
  // que pueda ocurrir durante el proceso de creación del usuario.
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
// función asincrónica que toma dos argumentos:
// title (título de la publicación) y post (contenido de la publicación).
const addPost = async (title, post) => {
  const name = auth.currentUser.displayName;
  const userId = auth.currentUser.uid;
  const date = new Date(); // Obtiene la fecha actual en la zona horaria del usuario
  // eslint-disable-next-line no-unused-vars, no-use-before-define
  const utcDate = convertToUTC(date); // Convierte la fecha a UTC
  // eslint-disable-next-line no-use-before-define
  const formattedDate = formatDate(date); // Formatea la fecha
  // Se inicializa un arreglo vacío llamado likes para almacenar futuras interacciones
  // de "me gusta" u otro tipo de interacción de usuarios con la publicación.
  const likes = [];
  const postsCollection = collection(db, 'posts');
  //  la función addDoc para agregar un nuevo documento (o registro) a la colección "posts"
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

// Función para convertir una fecha a UTC
function convertToUTC(date) {
// date.getTime() devuelve la zona horaria del usuario en milisegundos
// date.getTimezoneOffset() devuelve la diferencia, en minutos,
// entre la zona horaria local del usuario y la zona horaria UTC
// UTC (Tiempo Universal Coordinado)
// multiplica el valor de la diferencia de zona horaria
// en minutos por 60000 para convertirlo en milisegundos
// se suma y se tiene un nuevo objeto
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  //  El resultado se almacena en la variable utcDate.
  return utcDate;
}

// Función para formatear la fecha en un formato legible
function formatDate(date) {
// El objeto options utiliza propiedades como
// month: 'long' para incluir por ej: "septiembre" en lugar de "09"
  const options = {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC',
  };
  return date.toLocaleDateString('en-US', options);
}

const getPosts = async () => {
  const postsCollection = collection(db, 'posts');
  // Se crea una consulta (query) que selecciona todos
  // los documentos en la colección "posts" y los ordena en orden descendente
  const q = query(postsCollection, orderBy('date', 'desc'));
  // La función getDocs() obtiene los documentos que cumplen con los criterios de la consulta.
  // La palabra clave await se utiliza aquí para
  // esperar a que se resuelva la consulta antes de continuar.
  // postsQuery contendrá los resultados de la consulta.
  const postsQuery = await getDocs((q));
  // arreglo vacío llamado posts que se utilizará para almacenar
  // los documentos recuperados de la base de datos.
  const posts = [];
  // Se itera a través de los resultados de la consulta utilizando el método forEach().
  postsQuery.forEach((postDoc) => {
  // el método data() devuelve un objeto que representa los datos almacenados en el documento.
    const post = postDoc.data();
    // Se agrega una propiedad "id" al objeto post
    post.id = postDoc.id;
    // al arreglo posts construye una lista de todas
    // las publicaciones recuperadas de la base de datos.
    posts.push(post);
  });
  return posts; // devuelve el arreglo
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
  if (postDoc.exists) {
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
      Promise((resolve, reject) => {
        name, email, imgProfile, userId,
      });
    } else {
      reject(new Error('No hay usuario'));
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
  formatDate
  toggleLike
};
