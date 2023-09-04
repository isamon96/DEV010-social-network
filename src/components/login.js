// import { sigInWithGoogle, loginUser } from '../lib/index.js';

function login(navigateTo) {
  function createImgWithClass(className, src) {
    const img = document.createElement('img');
    img.className = className;
    img.alt = '';
    img.src = src;
    return img;
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

  const section = document.createElement('section');
  section.className = 'login';

  const loginDiv = createDivWithClass('forget', '¿Olvidaste tu contraseña?');
  const registerDiv = createDivWithClass('new', '¿Nuevo? Regístrate aquí.');
  const loginInnerDiv = createDivWithClass('loginInner');
  const orangeButtonDiv = createDivWithClass('orangeButton');
  const entrarDiv = createDivWithClass('entrar', 'ENTRAR');
  const emailDiv = createDivWithClass('email', 'correo electrónico');
  const passwordDiv = createDivWithClass('pass', 'contraseña');
  const googleLoginIconImg = createImgWithClass('googleloginIcon', './assets/googlelogin@2x.png');
  const buttonReturn = createImgWithClass('home-03-icon', './assets/home-03.png');

  // Incorporaciones de Isa
  buttonReturn.textContent = 'Regresar';
  //   const form = document.createElement('form');
  //   const inputEmail = document.createElement('input');
  //   const inputPass = document.createElement('input');
  //   const buttonLogin = document.createElement('button');
  //   const registrarButton = document.createElement('button');
  //   const buttonLoginUser = document.createElement('button');

  //   inputEmail.placeholder = 'Write email';
  //   inputPass.placeholder = 'pass';

  //   buttonLogin.textContent = 'google';
  //   registrarButton.textContent = 'Registrar';
  //   buttonLoginUser.textContent = 'Login';

  //   buttonLogin.addEventListener('click', sigInWithGoogle);
  //   registrarButton.addEventListener('click', () => {
  //     navigateTo('/registrar');
  //   });

  //   buttonLoginUser.addEventListener('click', (event) => {
  //     event.preventDefault();
  //     const email = inputEmail.value;
  //     const password = inputPass.value;
  //     loginUser(email, password);
  //   });

  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  const logoIconImg = createImgWithClass('logoIcon', './assets/re+mini.png');
  const keyIconImg = createImgWithClass('key-01-icon', './assets/key-01.png');
  const userPlusIconImg = createImgWithClass('user-plus-01-icon', './assets/user-plus-01.png');

  const loginItemButton1 = createButtonWithClass('Rectangle-1'); // Nuevo botón
  const loginItemButton2 = createButtonWithClass('Rectangle-2'); // Nuevo botón

  // Append elements to the section
  section.appendChild(loginDiv);
  section.appendChild(registerDiv);
  section.appendChild(loginInnerDiv);
  section.appendChild(orangeButtonDiv);// Y si lo dejamos como el otro button?
  orangeButtonDiv.appendChild(entrarDiv);
  section.appendChild(emailDiv);
  section.appendChild(passwordDiv);
  section.appendChild(googleLoginIconImg);
  section.appendChild(buttonReturn);
  section.appendChild(logoIconImg);
  section.appendChild(keyIconImg);
  section.appendChild(userPlusIconImg);
  section.appendChild(loginItemButton1);
  section.appendChild(loginItemButton2); // Agregar nuevo botón

  //   Así están ordenadas antes del return y export por Isa
  //   form.append(inputEmail, inputPass, buttonLoginUser);
  //   section.append(form, buttonReturn, registrarButton, buttonLogin);

//   return section;
// }

// export default login;
