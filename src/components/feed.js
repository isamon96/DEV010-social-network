import { addPost, getPosts, showPosts } from '../lib/index.js';

function feed(navigateTo) {
  const section = document.createElement('section');
  section.className = 'container';

  // const backgroundSection = document.createElement('section');
  // backgroundSection.classList.add('backgroundSection');

  const header = document.createElement('header');
  header.classList.add('header');

  // const textArea = document.createElement('textarea');
  // textArea.classList.add('textArea');
  // textArea.placeholder = 'Escribe tu post aquí';

  const postsSection = document.createElement('section');
  postsSection.setAttribute('id', 'postsSection');
  postsSection.append(addPost());
  // addPost (con textarea y boton submit) importado

  const userIcon = document.createElement('img');
  userIcon.className = 'userIcon';
  userIcon.alt = 'user icon';
  userIcon.src = '../assets/userIcon.png';

  const logoImg = document.createElement('img');
  logoImg.className = 'logoImgFeed';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  // const feedName = document.createElement('h1');
  // feedName.className = 'feedName';
  // feedName.textContent = 'Tu muro';

  const textAreaSection = document.createElement('section');
  textAreaSection.classList.add('textAreaSection');

  const containerPost = document.createElement('section');
  // luego se agrega en onSnapshot con .innerHTML = ''
  // postContainer.append(postLikeContainer) dentro de un for each

  const form = document.createElement('form');
  // const hr = document.createElement('hr');
  // hr.className = 'hrFeed';

  const inputTitle = document.createElement('input');
  const inputPost = document.createElement('input');
  const btnPost = document.createElement('button');
  const withOutPost = document.createElement('p');

  inputPost.className = 'inputPost';
  inputPost.type = 'text';
  inputPost.placeholder = 'Escribe tu post';

  inputTitle.className = 'inputLog';
  inputTitle.type = 'text';
  inputTitle.placeholder = 'Título de tu post';

  btnPost.className = 'button';
  btnPost.textContent = 'Enviar';

  const footer = document.createElement('footer');
  footer.classList.add('footer');
  // footer.appendChild(navigationBar(navigateTo)) // navigationBar importada
  // section.append(header, sectionPost, footer) // se añade contendor padre section a body
  
  section.append(header, textAreaSection, withOutPost, postsSection, footer);
  header.append(logoImg, userIcon);
  textAreaSection.append(form);
  postsSection.appendChild(containerPost);
  form.append(inputTitle, inputPost, btnPost);
  
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
