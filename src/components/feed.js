function feed(navigateTo) {
  const section = document.createElement('section');
  section.className = 'container';
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
  const feedPost = document.createElement('h1');
  feedPost.className = 'feedPost';
  feedPost.textContent = 'Tus publicaciones';
  const form = document.createElement('form');
  const postFeed = document.createElement('input');
  postFeed.className = 'inputLog';
  postFeed.type = 'text';
  postFeed.placeholder = 'Escribe aquí tu postFeed';
  const hr = document.createElement('hr');
  hr.className = 'hrFeed';

  // Foto de usuario
  // Nombre de usuario
  // Corazón plus (conteo)
  // Post

  section.append(logoImg, userIcon, feedName, feedPost, hr);
  form.append(postFeed);
  section.append(hr, form);

  return section;
}

export default feed;
