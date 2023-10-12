import { resetPassword } from '../lib/index.js';

function forgotPassword(navigateTo) {
  const section = document.createElement('section');
  const logoImg = document.createElement('img');
  const emailSearchAnchor = document.createElement('a');
  const inputEmail = document.createElement('input');
  const form = document.createElement('form');
  const btnRecover = document.createElement('button');
  const homeImg = document.createElement('img');
  const mensaje = document.createElement('p');
  const contentSection = document.createElement('section');
  const formSection = document.createElement('section');

  section.className = 'container';
  contentSection.className = 'contentSection';
  formSection.className = 'formSection';

  logoImg.className = 'logoImg';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.svg';

  inputEmail.className = 'inputLog';
  inputEmail.type = 'text';
  inputEmail.placeholder = '📧   Correo electrónico';
  emailSearchAnchor.textContent = 'Ingresa tu correo electrónico para recuperar tu cuenta';

  homeImg.className = 'iconImg';
  homeImg.alt = 'Icono de inicio';
  homeImg.src = '../assets/home.png';

  btnRecover.className = 'buttons';
  btnRecover.textContent = 'Recuperar';
  btnRecover.addEventListener('click', (event) => {
    event.preventDefault();
    // se evita que la página se recargue
    resetPassword(inputEmail.value, mensaje);
    // se llama a la fx pasando los valores del campo de entrada de email y mensaje como argumentos
  });

  form.append(inputEmail);
  formSection.append(emailSearchAnchor, form, btnRecover, mensaje, homeImg);
  contentSection.append(logoImg, formSection);
  section.append(contentSection);

  homeImg.addEventListener('click', () => {
    navigateTo('/');
  });

  return section;
}

export default forgotPassword;
