import { addPost, getPosts, showPosts } from '../lib/index.js';

function feed(navigateTo) {
  const section = document.createElement('section');
  const logoImg = document.createElement('img');
  const form = document.createElement('form');
  const inputTitle = document.createElement('input');
  const inputPost = document.createElement('input');
  const btnPost = document.createElement('button');
  const withOutPost = document.createElement('p');

  inputPost.className = 'inputLog';
  inputPost.type = 'text';
  inputPost.placeholder = 'Escribe tu post';

  inputTitle.className = 'inputLog';
  inputTitle.type = 'text';
  inputTitle.placeholder = 'Título de tu post';

  btnPost.className = 'btnLogin';
  btnPost.textContent = 'Enviar';

  logoImg.className = 'logoImg';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  form.append(inputTitle, inputPost, btnPost);
  section.append(form, withOutPost, logoImg);

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
    const postsList = await getPosts();
    const postContainer = await showPosts(postsList);
    document.body.appendChild(postContainer);
  });

  logoImg.addEventListener('click', () => {
    navigateTo('/');
  });
  return section;
}

export default feed;
