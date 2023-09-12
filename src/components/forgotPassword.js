function forgotPassword(navigateTo) {
  const section = document.createElement('section');
  const logoImg = document.createElement('img');
  const emailSearchAnchor = document.createElement('a');
  const inputEmail = document.createElement('input');
  const form = document.createElement('form');
  const btnRecover = document.createElement('button');
  const homeImg = document.createElement('img');
  section.className = 'container';

  logoImg.className = 'logoImg';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  inputEmail.className = 'inputLog';
  inputEmail.type = 'text';
  inputEmail.placeholder = '📧   Correo electrónico';
  emailSearchAnchor.textContent = 'Ingresa tu correo electrónico para recuperar tu cuenta';

  homeImg.className = 'iconImg';
  homeImg.alt = 'Icono de inicio';
  homeImg.src = '../assets/home.png';

  btnRecover.className = 'btnRecover';
  btnRecover.textContent = 'Recuperar';

  section.append(logoImg, emailSearchAnchor, form, btnRecover, homeImg);
  // btnRecover.append(btnRecover);
  form.append(inputEmail);

  homeImg.addEventListener('click', () => {
    navigateTo('/');
  });

  return section;
}

export default forgotPassword;
