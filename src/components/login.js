function login(navigateTo) {
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
  const homeIconImg = createImgWithClass('home-03-icon', './assets/home-03.png');
  homeIconImg.addEventListener('click', () => {
    navigateTo('/');
  });
  const logoIconImg = createImgWithClass('logoIcon', './assets/re+mini.png');
  const keyIconImg = createImgWithClass('key-01-icon', './assets/key-01.png');
  const userPlusIconImg = createImgWithClass('user-plus-01-icon', './assets/user-plus-01.png');

  const loginItemButton1 = createButtonWithClass('Rectangle-1'); // Nuevo botón
  const loginItemButton2 = createButtonWithClass('Rectangle-2'); // Nuevo botón
2
  // Append elements to the section
  section.appendChild(loginDiv);
  section.appendChild(registerDiv);
  section.appendChild(loginInnerDiv);
  section.appendChild(orangeButtonDiv);
  orangeButtonDiv.appendChild(entrarDiv);
  section.appendChild(emailDiv);
  section.appendChild(passwordDiv);
  section.appendChild(googleLoginIconImg);
  section.appendChild(homeIconImg);
  section.appendChild(logoIconImg);
  section.appendChild(keyIconImg);
  section.appendChild(userPlusIconImg);
  section.appendChild(loginItemButton1);
  section.appendChild(loginItemButton2); // Agregar nuevo botón

  return section;
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