import { createUser } from '../lib/index.js';

function register(navigateTo) {
  const section = document.createElement('section');
  const logoImg = document.createElement('img');
  const homeImg = document.createElement('img');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const btnLoginGoogle = document.createElement('button');
  const logoGoogle = document.createElement('img');
  const googleText = document.createElement('p');
  const hr = document.createElement('hr');
  const registerButton = document.createElement('button');
  const loginAnchor = document.createElement('a');

  section.className = 'container';
  logoImg.className = 'logoImg';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  btnLoginGoogle.className = 'btnGoogle';

  logoGoogle.id = 'iconGoogle';
  logoGoogle.alt = 'Logo de Google';
  logoGoogle.src = '../assets/googleIcon.svg';

  googleText.textContent = 'Inicia sesión con Google';
  loginAnchor.textContent = '¿Ya tienes una cuenta?';

  homeImg.className = 'iconImg';
  homeImg.alt = 'Icono de inicio';
  homeImg.src = '../assets/home.png';

  inputName.className = 'inputLog';
  inputName.type = 'text';
  inputName.placeholder = 'Nombre';

  inputEmail.className = 'inputLog';
  inputEmail.type = 'text';
  inputEmail.placeholder = 'Correo electrónico';

  inputPass.className = 'inputLog';
  inputPass.type = 'password';
  inputPass.placeholder = 'Contraseña';

  homeImg.addEventListener('click', () => {
    navigateTo('/');
  });

  homeImg.textContent = 'Return to home';
  registerButton.textContent = 'Registrar';
  homeImg.addEventListener('click', () => {
    navigateTo('/');
  });

  registerButton.addEventListener('click', (event) => {
    event.preventDefault();
    const email = inputEmail.value;
    const password = inputPass.value;
    createUser(email, password);
  });

  loginAnchor.addEventListener('click', () => {
    navigateTo('/login');
  });

  form.append(inputName, inputEmail, inputPass, registerButton, loginAnchor);
  btnLoginGoogle.append(logoGoogle, googleText);
  section.append(logoImg, btnLoginGoogle, hr, form, homeImg);

  return section;
}

export default register;
