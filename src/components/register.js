import { createUser, updateDisplayName } from '../lib/index.js';

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
  const mensaje = document.createElement('p');
  const contentSection = document.createElement('section');
  const formSection = document.createElement('section');

  section.className = 'container';
  contentSection.className = 'contentSection';
  formSection.className = 'formSection';

  logoImg.className = 'logoImg';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.svg';
  btnLoginGoogle.className = 'btnGoogle';

  logoGoogle.id = 'iconGoogle';
  logoGoogle.alt = 'Logo de Google';
  logoGoogle.src = '../assets/googleIcon.svg';

  googleText.textContent = 'Inicia sesión con Google';
  loginAnchor.textContent = '¿Ya tienes una cuenta?';

  mensaje.id = 'mensaje';

  homeImg.className = 'iconImg';
  homeImg.alt = 'Icono de inicio';
  homeImg.src = '../assets/home.png';

  inputName.className = 'inputLog';
  inputName.type = 'text';
  inputName.placeholder = '😎 Nombre';

  inputEmail.className = 'inputLog';
  inputEmail.type = 'text';
  inputEmail.placeholder = '📧 Correo electrónico';

  inputPass.className = 'inputLog';
  inputPass.type = 'password';
  inputPass.placeholder = '🔑 Contraseña';

  registerButton.className = 'buttons';

  homeImg.addEventListener('click', () => {
    navigateTo('/');
  });

  homeImg.textContent = 'Return to home';
  registerButton.textContent = 'Registrar';
  homeImg.addEventListener('click', () => {
    navigateTo('/');
  });

  registerButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const email = inputEmail.value;
    const password = inputPass.value;
    const name = inputName.value;
    // se obtienen los valores de los campos de entrada
    try {
      await createUser(email, password, mensaje);
      await updateDisplayName(name);
      // se llama a las funciones de forma asíncrona pasando los valores como argumentos
      inputEmail.value = '';
      inputPass.value = '';
      inputName.value = '';
      // se borran los valores de los campos de entrada
      return true;
    } catch (error) {
      return error;
      // se devuelve true si todo funciona correctamente o el error si hay algún problema
    }
  });

  loginAnchor.addEventListener('click', () => {
    navigateTo('/login');
  });

  form.append(inputName, inputEmail, inputPass, mensaje, registerButton, loginAnchor);
  btnLoginGoogle.append(logoGoogle, googleText);
  contentSection.append(logoImg, formSection);
  formSection.append(btnLoginGoogle, hr, form, homeImg);
  section.append(contentSection);

  return section;
}

export default register;
