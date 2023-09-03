import { sigInWithGoogle, loginUser } from '../lib/index.js';

function login(navigateTo) {
  const section = document.createElement('section');
  section.className = 'login';

  const buttonLogin = createButtonWithClass('forget');
  const buttonRegistar = createButtonWithClass('new');
  const loginInnerDiv = createDivWithClass('loginInner');
  const orangeButtonDiv = createDivWithClass('orangeButton');
  const buttonLoginUser = createButtonWithClass('entrar');
  const form = document.createElement('form'); // Crear el elemento <form>
  const inputEmail = createInputWithClass('email'); // Crear el input para el correo electrónico
  const inputPass = createInputWithClass('pass'); // Crear el input para la contraseña
  const buttonGoogleLogin = createButtonWithClass('googleLogin');
  const homeIconImg = createImgWithClass('home-03-icon', './assets/home-03.png');
  homeIconImg.addEventListener('click', () => {
    navigateTo('/');
  });
  const logoIconImg = createImgWithClass('logoIcon', './assets/re+mini.png');
  const keyIconImg = createImgWithClass('key-01-icon', './assets/key-01.png');
  const userPlusIconImg = createImgWithClass('user-plus-01-icon', './assets/user-plus-01.png');

  const loginItemButton1 = createButtonWithClass('Rectangle-1'); // Nuevo botón
  const loginItemButton2 = createButtonWithClass('Rectangle-2'); // Nuevo botón

  inputEmail.placeholder = 'correo electrónico';
  inputPass.placeholder = 'contraseña';
  
  // title.textContent = 'Login';
  buttonLogin.textContent = 'google';
  buttonRegistar.textContent = 'Registrar';
  buttonLoginUser.textContent = 'Ingresar';



  buttonLogin.addEventListener('click', sigInWithGoogle);
    registrarButton.addEventListener('click', () => {
      navigateTo('/registrar');
    });
  
  buttonLoginUser.addEventListener('click', (event) => {
    event.preventDefault();
    const email = inputEmail.value;
    const password = inputPass.value;
    loginUser(email, password);
    });
  
  form.append(inputEmail, inputPass, buttonLoginUser);;
  section.append(title, form, buttonReturn, registrarButton, buttonLogin);
  
  

  // Append elements to the section
  section.appendChild(buttonLogin);
  section.appendChild(buttonRegistar);
  section.appendChild(loginInnerDiv);
  section.appendChild(orangeButtonDiv);
  orangeButtonDiv.appendChild(entrarDiv);
  section.appendChild(form);
  // section.appendChild(imputEmail);
  // section.appendChild(imputPass);
  section.appendChild(buttonGoogleLogin);
  section.appendChild(homeIconImg);
  section.appendChild(logoIconImg);
  section.appendChild(keyIconImg);
  section.appendChild(userPlusIconImg);
  section.appendChild(loginItemButton1);
  section.appendChild(loginItemButton2); // Agregar nuevo botón

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

