import { sigInWithGoogle, loginUser } from '../lib/index.js';

function login(navigateTo) {
  const section = document.createElement('section');
  const logoImg = document.createElement('img');
  const btnLoginGoogle = document.createElement('button');
  const logoGoogle = document.createElement('img');
  const googleText = document.createElement('p');
  const hr = document.createElement('hr');
  const form = document.createElement('form');
  const inputEmail = document.createElement('input');
  const inputPass = document.createElement('input');
  const registerAnchor = document.createElement('a');
  const btnLogin = document.createElement('button');
  const passAnchor = document.createElement('a');
  const homeImg = document.createElement('img');

  section.className = 'container';

  logoImg.className = 'logoImg';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  btnLoginGoogle.className = 'btnGoogle';

  logoGoogle.id = 'iconGoogle';
  logoGoogle.alt = 'Logo de Google';
  logoGoogle.src = '../assets/googleIcon.svg';

  googleText.textContent = 'Inicia sesión con Google';

  inputEmail.className = 'inputLog';
  inputEmail.type = 'text';
  inputEmail.placeholder = 'Correo electrónico';

  inputPass.className = 'inputLog';
  inputPass.type = 'password';
  inputPass.placeholder = 'Contraseña';

  registerAnchor.textContent = '¿Nuevo usuario? Regístrate';

  btnLogin.className = 'btnLogin';
  btnLogin.textContent = 'Iniciar sesión';

  passAnchor.textContent = '¿Olvidaste tu contraseña?';

  homeImg.className = 'iconImg';
  homeImg.alt = 'Icono de inicio';
  homeImg.src = '../assets/home.png';

  homeImg.addEventListener('click', () => {
    navigateTo('/');
  });
  btnLoginGoogle.addEventListener('click', sigInWithGoogle);
  registerAnchor.addEventListener('click', () => {
    navigateTo('/registrar');
  });

  btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    const email = inputEmail.value;
    const password = inputPass.value;
    loginUser(email, password);
  });

  section.append(logoImg, btnLoginGoogle, hr, form, registerAnchor, btnLogin, passAnchor, homeImg);
  btnLoginGoogle.append(logoGoogle, googleText);
  form.append(inputEmail, inputPass);

  btnLoginGoogle.addEventListener('click', sigInWithGoogle);
  registerAnchor.addEventListener('click', () => {
    navigateTo('/register');
  });

  btnLogin.addEventListener('click', (event) => {

  passAnchor.addEventListener('click', () => {
    navigateTo('/forgotPassword');
  });

  section.append(logoImg, btnLoginGoogle, hr, form, registerAnchor, btnLogin, passAnchor, homeImg);
  btnLoginGoogle.append(logoGoogle, googleText);
  form.append(inputEmail, inputPass);

    });
  
  form.append(inputEmail, inputPass, buttonLoginUser);;
  section.append(title, form, buttonReturn, registrarButton, buttonLogin);
  
  return section;
}

function createInputWithClass(className) {
  const input = document.createElement('input');
  input.className = className;
  return input;
}

function createDivWithClass(className, textContent) {
  const div = document.createElement('div');
  div.className = className;
  div.textContent = textContent || '';
  return div;
}

function createButtonWithClass(className) {
  const button = document.createElement('button');
  button.className = className;
  button.textContent = '';
  return button;
}

function createImgWithClass(className, src) {
  const img = document.createElement('img');
  img.className = className;
  img.alt = '';
  img.src = src;
  return img;
}

export default login;

