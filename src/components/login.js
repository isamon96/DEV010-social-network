import { sigInWithGoogle, loginUser } from '../lib/index.js';

function login(navigateTo) {
// comprueba que el usuario este registrado con igual estricta y navega al Feed
  if (localStorage.getItem('userRegistered') === 'true') {
    return navigateTo('/feed');
  }
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
  const mensaje = document.createElement('p');
  const contentSection = document.createElement('section');
  const formSection = document.createElement('section');
  // section hace referencia a un elemento HTML
  section.className = 'container';
  contentSection.className = 'contentSection';
  formSection.className = 'formSection';

  logoImg.className = 'logoImg';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.svg';

  btnLoginGoogle.className = 'btnGoogle';

  logoGoogle.id = 'iconGoogle';
  logoGoogle.alt = 'Logo de Google';
  logoGoogle.src = '../assets/googleIcon.png';

  googleText.textContent = 'Inicia sesión con Google';

  inputEmail.className = 'inputLog';
  inputEmail.type = 'text';
  inputEmail.placeholder = '📧   Correo electrónico';

  inputPass.className = 'inputLog';
  inputPass.type = 'password';
  inputPass.placeholder = '🔑   Contraseña';

  registerAnchor.textContent = '¿Nuevo usuario? Regístrate';

  btnLogin.className = 'buttons';
  btnLogin.textContent = 'Iniciar sesión';

  passAnchor.textContent = '¿Olvidaste tu contraseña?';
  passAnchor.id = 'passAnchor';

  homeImg.className = 'iconImg';
  homeImg.alt = 'Icono de inicio';
  homeImg.src = '../assets/home.png';

  // Agregando mensaje
  mensaje.id = 'mensaje';
  // re direge al usuario a ...
  homeImg.addEventListener('click', () => {
    navigateTo('/');
  });
  btnLoginGoogle.addEventListener('click', async (event) => {
    event.preventDefault();
    const user = await sigInWithGoogle(event);
    if (user) {
      navigateTo('/feed');
    }
  });
  registerAnchor.addEventListener('click', () => {
    navigateTo('/register');
  });

  btnLogin.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = inputEmail.value;
    const password = inputPass.value;
    const user = await loginUser(email, password, mensaje);
    if (user) {
      navigateTo('/feed');
    }
  });

  passAnchor.addEventListener('click', () => {
    navigateTo('/forgotPassword');
  });

  section.append(contentSection);
  contentSection.append(logoImg, formSection);
  formSection.append(btnLoginGoogle, hr, form, registerAnchor, btnLogin, passAnchor, homeImg);
  btnLoginGoogle.append(logoGoogle, googleText);
  form.append(inputEmail, inputPass, mensaje);

  return section;
}

export default login;
