function feed(navigateTo) {
  const section = document.createElement('section');
  const logoImgFeed = document.createElement('img');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const btnLogin = document.createElement('button');
  const homeImg = document.createElement('img');
  
  section.className = 'container';

  logoImgFeed.className = 'logoImg';
  logoImgFeed.alt = 'Logo de la página';
  logoImgFeed.src = '../assets/logo.png';

  inputEmail.className = 'inputLog';
  inputEmail.type = 'text';
  inputEmail.placeholder = '📝 Escribe aquí';

  btnLogin.className = 'btnLogin';
  btnLogin.textContent = 'Nuevo Post';

  homeImg.className = 'iconImg';
  homeImg.alt = 'Icono de inicio';
  homeImg.src = '../assets/home.png';

  homeImg.addEventListener('click', () => {
    navigateTo('/createNewPost');
  });

  section.append(logoImgFeed, form, btnLogin, homeImg);
  form.append(inputEmail);

  return section;
}

export default feed;
