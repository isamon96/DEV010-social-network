import { addPost, getPosts, showPosts } from '../lib/index.js';
import navigationBar from './navigationBar.js';

function feed(navigateTo) {
  if (localStorage.getItem('userRegistered') !== 'true') {
    return navigateTo('/login');
    // verifica si el usuario está registrado, si no es así, se redirige a login
  }

  const section = document.createElement('section');
  section.className = 'container';

  const header = document.createElement('header');
  header.classList.add('header');

  const postsSection = document.createElement('section');
  postsSection.id = 'postsSection';

  async function loadAndShowPosts() {
    postsSection.innerHTML = '';
    // vacía el contenido usando innerHTML
    const postsList = await getPosts();
    const posts = await showPosts(postsList);
    // utiliza ñas fx get y showposts para mostrar los posts
    return posts;
  }

  const logoImg = document.createElement('img');
  logoImg.className = 'logoImgFeed';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  const textAreaSection = document.createElement('section');
  textAreaSection.classList.add('textAreaSection');

  const form = document.createElement('form');
  const inputTitle = document.createElement('input');
  const inputPost = document.createElement('textarea');
  const charCount = document.createElement('span');
  const btnPost = document.createElement('button');
  const withOutPost = document.createElement('p');

  inputTitle.className = 'inputTitle';
  inputTitle.type = 'text';
  inputTitle.placeholder = 'Título de tu post';

  inputPost.className = 'inputPost';
  inputPost.placeholder = '¿Qué deseas compartir?';

  btnPost.className = 'btnPost';
  btnPost.textContent = 'Enviar';

  inputPost.addEventListener('input', () => {
    const characterCount = inputPost.value.length;
    // dentro del evento se obtiene la longitud del valor ingresado
    charCount.textContent = `${characterCount}/1000`;
    // actualiz contenido del elemento charCount
  });

  const footer = document.createElement('footer');
  footer.className = ('footer');

  loadAndShowPosts();
  // se llama para cargar y mostrar los posts en la página

  btnPost.addEventListener('click', async (event) => {
    event.preventDefault();
    // cuando se hace clic se evita que la página se recargue
    const title = inputTitle.value.trim();
    const post = inputPost.value.trim();
    // se obtienen los valores del título y del post ingresados
    if (title === '' || post === '') {
      withOutPost.textContent = 'No puedes enviar un post vacío';
      // si alguno de los campos está vacío se muestra un mensaje de error
      return;
    }
    await addPost(title, post);
    // de lo contrario se llama a addPost para agregar título y post
    inputTitle.value = '';
    inputPost.value = '';
    withOutPost.textContent = '';
    // se borran los valores de los campos de entrada
    loadAndShowPosts();
  });

  section.append(header, textAreaSection, withOutPost, postsSection, footer);
  header.append(logoImg);
  textAreaSection.append(form, inputTitle, inputPost, btnPost);
  form.append(inputTitle, inputPost, charCount, btnPost);
  footer.appendChild(navigationBar(navigateTo));

  logoImg.addEventListener('click', () => {
    navigateTo('/');
  });
  return section;
}

export default feed;
