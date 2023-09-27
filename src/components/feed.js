import { addPost, getPosts, showPosts } from '../lib/index.js';

function feed(navigateTo) {
  if (!localStorage.getItem('user')) {
    return navigateTo('/login');
  }
  const section = document.createElement('section');
  section.className = 'container';

  const header = document.createElement('header');
  header.classList.add('header');

  const postsSection = document.createElement('section');
  postsSection.className = 'postsSection';

  const logoImg = document.createElement('img');
  logoImg.className = 'logoImgFeed';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  const textAreaSection = document.createElement('section');
  textAreaSection.classList.add('textAreaSection');

  const postContainer = document.createElement('container');

  const form = document.createElement('form');

  const inputTitle = document.createElement('input');
  const inputPost = document.createElement('textarea');
  const charCount = document.createElement('span');
  const btnPost = document.createElement('button');
  const withOutPost = document.createElement('p');

  inputTitle.className = 'inputLog';
  inputTitle.type = 'text';
  inputTitle.placeholder = 'Título de tu post';

  inputPost.className = 'inputPost';
  inputPost.placeholder = 'Escribe tu post';
  btnPost.className = 'button';
  btnPost.textContent = 'Enviar';

  inputPost.addEventListener('input', () => {
    const characterCount = inputPost.value.length;
    charCount.textContent = `${characterCount}/2000`;
  });

  const footer = document.createElement('footer');
  footer.classList.add('footer');

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
  textAreaSection.append(form, inputTitle, inputPost, btnPost);
  postsSection.append(postContainer);
  form.append(inputTitle, inputPost, charCount, btnPost);

  logoImg.addEventListener('click', () => {
    navigateTo('/');
  });
  return section;
}

export default feed;
