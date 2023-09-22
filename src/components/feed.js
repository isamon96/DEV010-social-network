import { addPost, getPosts, showPosts } from '../lib/index.js';

function feed(navigateTo) {
  const section = document.createElement('section');
  section.className = 'container';

  const header = document.createElement('header');
  header.classList.add('header');

  const userIcon = document.createElement('img');
  userIcon.className = 'userIcon';
  userIcon.alt = 'user icon';
  userIcon.src = '../assets/userIcon.png';

  const logoImg = document.createElement('img');
  logoImg.className = 'logoImgFeed';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  const feedName = document.createElement('h1');
  feedName.className = 'feedName';
  feedName.textContent = 'Tu muro';

  const footer = document.createElement('footer');
  // header.append(titleFeed, userIcon);

  const sectionPosts = document.createElement('secton');
  sectionPosts.classList.add('sectionPost');
  // sectionPosts.appendChild(addPost())
  // addPost (con textarea y boton submit) importado

  const containerPost = document.createElement('section');
  // luego se agrega en onSnapshot con .innerHTML = ''
  // postContainer.append(postLikeContainer) dentro de un for each
  
  const textArea = document.createElement('textarea');
  textArea.classList.add('text-area');
  textArea.placeholder = '¿Qué quieres compartir hoy?';

  // sectionPosts.appendChild(postContainer) // se añade contenedor de post
  // footer.appendChild(navigationBar(navigateTo)) // navigationBar importada
  // section.append(header, sectionPost, footer) // se añade contendor padre section a body

  const form = document.createElement('form');
  const hr = document.createElement('hr');
  hr.className = 'hrFeed';

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

  const backgroundSection = document.createElement('section');
  backgroundSection.classList.add('background-section');
  const textAreaSection = document.createElement('section');
  textAreaSection.classList.add('textAreaSection');

  
  section.append(header, feedName, hr, backgroundSection, footer);
  header.append(logoImg, userIcon);
  backgroundSection.append(containerPost, textAreaSection, form, withOutPost);
  textAreaSection.append(textArea, form);
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
