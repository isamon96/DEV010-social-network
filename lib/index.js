import {
  // funciones y métodos del módulo firebase/auth
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
  // funciones y métodos para interactuar con la base de datos Firestore de Firebase
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
// Estos objetos son instancias de la base de datos Firestore y
// del servicio de autenticación de Firebase, respectivamente.

import popUpConfirm from '../components/popUpConfirm';
import popUpEditPost from '../components/popUpEditPost';
// mostrar ventanas emergentes de confirmación y edición de publicaciones

const updateOutput = (outputElement, message) => {
  // recibe dos parámetros: outputElement y message
  if (outputElement) {
    outputElement.textContent = message;
    // si outputElement existe, se actualiza el contenido de su texto con el valor de message
  }
  // se usa para actualizar la salida de un elemento en interfaz de usuario con mensaje específico
};

const sigInWithGoogle = async (event) => {
  // función asíncrona que se ejecuta cuando se produce un evento
  event.preventDefault();
  // evita el comportamiento del evento
  const provider = new GoogleAuthProvider();
  try {
    const userCredential = await signInWithPopup(auth, provider);
    // crea una instancia y utiliza la función signWithPopUp para autenticar al usuario
    const user = userCredential.user;
    // si es exitosa se guarda el objeto de usuario en userCredential
    localStorage.setItem('userRegistered', 'true');
    // se establece un valor de almacenamiento local llamado "userRegistered" como true
    return user;
  } catch (error) {
    return error;
    // si hay un error en la autenticación, se devuelve el error
  }
};

// eslint-disable-next-line max-len
const createUser = (email, password, element) => createUserWithEmailAndPassword(auth, email, password)
  // toma 3 parámetros y luego usa la fx para crear un nuevo usuario
  .then((userCredential) => {
    // función then() se utiliza para manejar el resultado exitoso de una promesa
    auth.signOut();
    // después que el usuario es autenticado, se cierra la sesión del usuario actual
    sendEmailVerification(auth.currentUser).then(() => {
      const message = 'Usuario creado, revisa tu correo para verificar tu cuenta.';
      updateOutput(element, message);
    });
    // se envía un correo de verificación y se muestra un mensaje en el elemento especificado
    return userCredential;
  })
  .catch((error) => {
    // si hay error en la creación de usuario, se muestra mensaje según el código de error recibido
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
  // la fx recibe tres parámetros y utiliza la fx (signInWi...) con email y password proporcionados
  .then((userCredential) => {
    localStorage.setItem('userRegistered', 'true');
    // establece un valor en el almacenamiento local del navegador
    // en este caso, se establece la clave 'userRegistered' con el valor 'true'
    // significa que se guarda la info de que el usuario está registrado
    return userCredential;
    // si autenticación es exitosa, se guarda en localStorage y devuelve el objeto userCredential
  })
  .catch((error) => {
    // si hay error en la creación de usuario, se muestra mensaje según el código de error recibido
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

function formatDate(date) {
  const options = {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
  // la fx recibe un objeto date y devuelve una cadena de texto formateada con la fecha/hora
}

const addPost = async (title, post) => {
  // función asíncrona que agrega nueva publicación al sistema
  const name = auth.currentUser.displayName;
  const userId = auth.currentUser.uid;
  // se obtiene name y ID a través del objeto authCurrentUser
  const date = new Date();
  // crea un nuevo objeto de fecha y hora utilizando la clase Date
  const formattedDate = formatDate(date);
  // se obtiene fecha actual y se formatea con formatDate
  const likes = [];
  // se inicializa un array vacío para los likes
  const postsCollection = collection(db, 'posts');
  // se obtiene una referencia a la colección posts en db
  // permite acceder y manipular los docs utilizando otras fx y métodos de la biblio o framework
  const docRef = await addDoc(postsCollection, {
    // se utiliza la fx addDoc para agregar un nuevo documento con los datos
    name,
    date: formattedDate,
    title,
    post,
    userId,
    likes,
  });
  return docRef;
  // se devuelve una referencia al documento recién creado
};

const getPosts = async () => {
  const postsCollection = collection(db, 'posts');
  // crea una referencia a la colección "posts" en la db
  const q = query(postsCollection, orderBy('date', 'desc'));
  // obtiene todas las publicaciones de la colección en orden descendente según fecha
  // fx query toma 2 argumentos (colección de publicaciones y ordenamiento según fecha)
  const postsQuery = await getDocs((q));
  // obtiene los docs de la colección utilizando la consulta q (se pasa como argumento)
  // el resultado se almacena en la variable postQuery
  // await = la operación es asíncrona y espera que se resuelva antes de continuar con el siguiente
  const posts = [];
  // crea un array vacío llamado posts
  postsQuery.forEach((postDoc) => {
    // itera sobre cada doc utilizando forEach
    const post = postDoc.data();
    // se obtiene el objeto de datos del documento postDoc utilizando la función data()
    post.id = postDoc.id;
    // agrega nueva propiedad id al objeto post, asignándole el valor del id del documento postDoc
    posts.push(post);
    // se agrega el objeto post al array posts
  });
  return posts;
  // al finalizar la iteración, se devuelve el array posts con los documentos transformados
};

const deletePost = async (id) => {
  // fx asíncrona que recibe un parámetro id
  await deleteDoc(doc(db, 'posts', id));
  // método deleteDoc para eliminar un doc de la colección posts en la db
  // el doc a eliminar se especifica utilizando el id proporcionado como argumento
  // await asegura que la operación de eliminación se complete antes de continuar con el siguiente
};

const editPost = async (id, title, post, likes) => {
  const postRef = doc(db, 'posts', id);
  // obtiene referencia al doc de la publicación utilizando el id
  const postDoc = await getDoc(postRef);
  // obtiene los datos existentes en el doc
  const existingData = postDoc.data();
  // resultado se guarda en la variable postDoc

  const dataToUpdate = {
    // crea un objeto con las propiedades title y post
    title: title !== undefined ? title : existingData.title,
    post: post !== undefined ? post : existingData.post,
    // si el valor no es undefined se asigna ese valor a la propiedad
    // de lo contrario se asigna el valor existente en existingData.title
  };

  if (likes !== undefined) {
    // si se proporciona el parámetro likes, se agrega la propiedad al objeto
    dataToUpdate.likes = likes;
  }

  await updateDoc(postRef, dataToUpdate);
  // actualiza el documento de la publicación con los nuevos datos
};

const toggleLike = async (id, element) => {
  // esta función se utiliza para alternar (activar o desactivar) el "me gusta" de una publicación
  const postRef = doc(db, 'posts', id);
  // obtiene referencia al doc utilizando un id
  const currentUser = auth.currentUser.uid;
  // almacena el identificador único del usuario actual obtenido de la propiedad uid del objeto
  const postDoc = await getDoc(postRef);
  // obtiene el doc de una publicación utilizando la referencia postRef y la fx getDoc()
  // el resultado se guarda en la variable postDoc
  if (postDoc.exists) {
    // obtiene los datos del documento y verifica si el doc tiene contenido o datos asociados a él
    const postData = postDoc.data();
    // asigna los datos del documento postDoc a la variable postData
    const likes = postData.likes || [];
    // si postData.likes tiene un valor definido, se asigna ese valor a likes
    // de lo contrario, se asigna un arreglo vacío [] a likes
    const userLiked = likes.includes(currentUser);
    // verifica si el usuario actual está incluido en la lista de likes
    // retorna un valor booleano: true si el usuario ha dado like
    if (userLiked) {
      const updatedLikes = likes.filter((like) => like !== currentUser);
      // filtra los elementos de likes y devuelve una nueva matriz sin el elemento currentUser
      await editPost(id, undefined, undefined, updatedLikes);
      // fx acepta 4 argumentos (title y content como undefined = no se realizarán cambios en ellos)
      const numberOfLikes = updatedLikes.length;
      // almacena la longitud del arreglo (cantidad de elementos que contiene)
      element.textContent = numberOfLikes;
      // actualiza el texto que se muestra en el elemento con la cantidad de likes
    } else {
      const updatedLikes = [...likes, currentUser];
      // crea una nueva matriz con todos los elementos de likes y agrega currentUser al final
      await editPost(id, undefined, undefined, updatedLikes);
      // se utiliza la fx editPost() para editar una publicación con el identificador id
      // sin realizar cambios en los argumentos title y content, pero actualizando la lista de likes
      const numberOfLikes = updatedLikes.length;
      element.textContent = numberOfLikes;
      // se guarda la longitud de la matriz updatedLikes en la variable numberOfLikes
      // y se asigna ese valor como texto del elemento element
    }
    return likes.length;
  }
  return false;
};

const showPosts = async (array) => {
  const postsSection = document.getElementById('postsSection');
  const currentUser = auth.currentUser.uid;
  // se asigna con el valor identificador único
  const postsList = await getPosts();
  // obtiene el elemento y lo guarda en postsSection
  if (postsList) {
    postsSection.innerHTML = '';
    // se eliminan todos los elementos hijos de ese elemento, dejándolo vacío
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
        // cuando se hace clic en el ícono, se obtiene el ID del post
        const numberOfLikes = await toggleLike(postId, likesNumber);
        // y se llama a la función toggleLike pasando el ID del post y el elemento likesNumber
        likesNumber.textContent = numberOfLikes;
        // luego, se actualiza el contenido de likesNumber con el número de likes devuelto por la fx
      });

      const iconSection = document.createElement('section');
      iconSection.className = 'iconSection';

      const likesSection = document.createElement('section');
      likesSection.className = 'likesSection';
      likesSection.append(likesNumber, likesIcon);

      if (currentUser === postUser) {
        // si usuario actual = usuario del post, se crea un ícono de edición (con clase e img)
        const editIcon = document.createElement('img');
        editIcon.className = 'editIcon';
        editIcon.src = '../assets/edit.png';
        editIcon.addEventListener('click', async () => {
          const editedPost = await popUpEditPost(post.title, post.post);
          // clic llama a la fx popUpEditPost para mostrar ventana emergente donde se puede editar
          const postId = post.id;
          // se obtiene el ID del post y los valores editados del objeto editedPost
          const editedTitle = editedPost.title;
          // se llama a la fx editPost pasando el ID del post y los valores editados
          const editedContent = editedPost.content;
          await editPost(postId, editedTitle, editedContent);
          postTitle.textContent = editedTitle;
          postContent.textContent = editedContent;
          // se actualiza el contenido del título y del contenido del post con los valores editados
        });

        const deleteIcon = document.createElement('img');
        deleteIcon.className = 'deleteIcon';
        deleteIcon.src = '../assets/delete.png';
        deleteIcon.addEventListener('click', async () => {
          const postId = post.id;
          // se obtiene el ID del post y muestra ventana emergente para confirmar si se elimina post
          const confirmed = await popUpConfirm('¿Estás seguro de que quieres eliminar este post?');
          if (confirmed) {
            await deletePost(postId);
            postContainer.remove();
          }
          // Si confirma, se llama a la fx deletePost pasando el ID y elimina el contenedor del post
        });

        iconSection.append(postTitle, editIcon, deleteIcon);
      } else {
        // si la condición es falsa, solo se agrega el elemento postTitle
        iconSection.append(postTitle);
      }

      postContainer.append(iconSection, postName, postDate, postContent, likesSection);
      postsSection.append(postContainer);
    });
  }
  return postsSection;
};

const updateDisplayName = async (newDisplayName) => {
  // actualiza el nombre de visualización del usuario actualmente autenticado
  try {
    await updateProfile(auth.currentUser, {
      // intenta actualizar el nombre de visualización del usuario autenticado
      displayName: newDisplayName,
      // se utiliza para actualizar el nombre de visualización del usuario actualmente autenticado
    });
    return true;
  } catch (error) {
    return error;
  }
};

const signOutUser = () => async () => {
  // fx flecha que devuelve otra fx asíncrona
  try {
    await signOut(auth);
    // intenta cerrar la sesión del usuario usando signOut de la biblioteca de autenticación auth
    return true;
    // si el cierre es exitoso devuelve true
  } catch (error) {
    // si ocurre algún error, devuelve el objeto error
    return error;
  }
};

const resetPassword = async (email, element) => {
  try {
    await sendPasswordResetEmail(auth, email);
    // intenta enviar un email para restablecer la contraseña
    const message = 'Correo enviado para restablecer contraseña.';
    // si tiene éxito, muestra un mensaje en el elemento
    updateOutput(element, message);
  } catch (error) {
    const errorCode = error.code;
    // si ocurre algún error, verifica el código de error y muestra mensajes según el tipo de error
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
  // fx asíncrona que devuelve una promesa
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    // se utiliza el método onAuthStateChanged para obtener info del usuario
    unsubscribe();
    // unsubscribe se utiliza para almacenar la función de cancelación de suscripción devuelta
    if (user) {
      // Si hay usuario autenticado, se extraen los datos y se resuelve la promesa
      const name = user.displayName;
      const email = user.email;
      const imgProfile = user.photoURL;
      const userId = user.uid;
      // se obtiene nombre, email, foto e ID del usuario y se resuelve la promesa con estos valores
      resolve({
        name, email, imgProfile, userId,
      });
    } else {
      reject(new Error('No hay usuario'));
      // si no hay usuario autenticado, se rechaza la promesa con un error
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
  formatDate,
  toggleLike,
};
