import { addPost, getPosts, showPosts } from '../lib/index.js';
import navigationBar from './navigationBar.js';

function feed(navigateTo) {
  const section = document.createElement('section');
  section.className = 'container';

  const header = document.createElement('header');
  header.classList.add('header');

  const feedTitle = document.createElement('h3');
  feedTitle.classList.add('feedTitle');
  feedTitle.textContent = 'Feed';

  const postsSection = document.createElement('section');
  postsSection.className = 'postsSection';

  const logoImg = document.createElement('img');
  logoImg.className = 'logoImgFeed';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  const textAreaSection = document.createElement('section');
  textAreaSection.classList.add('textAreaSection');

  const form = document.createElement('form');
  const inputTitle = document.createElement('input');
  const inputPost = document.createElement('textarea'); // Cambia input a textarea para un área de texto
  const charCount = document.createElement('span'); // Para contar los caracteres
  const btnPost = document.createElement('button');
  const withOutPost = document.createElement('p');

  inputTitle.className = 'inputLog';
  inputTitle.type = 'text';
  inputTitle.placeholder = 'Título de tu post';

  inputPost.className = 'inputPost';
  // inputPost.type = 'text';
  inputPost.placeholder = 'Escribe tu post';

  btnPost.className = 'btnPost';
  btnPost.textContent = 'Enviar';

  // Escuchar cambios en el área de texto y actualizar el contador de caracteres
  inputPost.addEventListener('input', () => {
    const characterCount = inputPost.value.length;
    charCount.textContent = `${characterCount}/500`;
  });

  const footer = document.createElement('footer');
  footer.className = ('footer');

  async function loadAndShowPosts() {
    const postsList = await getPosts();
    const posts = await showPosts(postsList);
    postsSection.innerHTML = '';
    postsSection.appendChild(posts);
  }

  loadAndShowPosts();

  btnPost.addEventListener('click', async (event) => {
    event.preventDefault();
    const title = inputTitle.value.trim();
    const post = inputPost.value.trim();
    if (title === '' || post === '') {
      withOutPost.textContent = 'No puedes enviar un post vacío';
      return;
    }
    await addPost(title, post);
    inputTitle.value = '';
    inputPost.value = '';
    withOutPost.textContent = '';
    loadAndShowPosts();
  });

  section.append(header, textAreaSection, withOutPost, postsSection, footer);
  header.append(logoImg);
  textAreaSection.append(feedTitle, form, inputTitle, inputPost, btnPost);
  form.append(inputTitle, inputPost, charCount, btnPost);
  footer.appendChild(navigationBar(navigateTo));

  logoImg.addEventListener('click', () => {
    navigateTo('/');
  });
  return section;
}

export default feed;
