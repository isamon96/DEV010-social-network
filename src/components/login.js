// import { sigInWithGoogle, loginUser } from '../lib/index.js';

// function login(navigateTo) {
//   const section = document.createElement('section');
//   // const title = document.createElement('h2');
//   const buttonReturn = document.createElement('button');
//   const googleLogin = document.createElement('img');
//   // const button = document.createElement('button');
//   const form = document.createElement('form');
//   const inputEmail = document.createElement('input');
//   const inputPass = document.createElement('input');
//   const forgotPassword = document.createElement('p');
//   const newLogin = document.createElement('p');
//   const logoLogin = document.createElement('img');
//   const buttonLogin = document.createElement('button');
//   const registrarButton = document.createElement('button');
//   const buttonLoginUser = document.createElement('button');

//   logoLogin.src = './assets/re+.png';
//   logoLogin.alt = 'logo de re+';
//   logoLogin.className = 'logoIconLogin';

//   googleLogin.className = 'googleLogin';
//   googleLogin.src = './assets/googleLogin.png';
//   googleLogin.alt = 'Ingreso con google';
//   inputEmail.placeholder = 'Correo electrónico';
//   inputPass.placeholder = 'Contraseña';

//   buttonLogin.textContent = 'google';
//   buttonReturn.textContent = 'Return to home';
//   registrarButton.textContent = 'Registrar';
//   buttonLoginUser.textContent = 'Login';

//   // title.textContent = 'Login';
//   buttonReturn.textContent = 'ENTRAR';
//   newLogin.textContent = '¿Nuev@? Regístrate aquí.';
//   newLogin.className = 'newLogin';
//   forgotPassword.textContent = '¿Olvidaste tu contraseña?';
//   forgotPassword.className = 'forgotPassword';

//   // button.textContent = 'Return to home';
//   buttonReturn.addEventListener('click', () => {
//     navigateTo('/');
//   });
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

//   section.append(logoLogin, googleLogin);
//   form.append(inputEmail, inputPass, buttonLoginUser);
//   section.append(form, buttonReturn, registrarButton, buttonLogin);
//   section.append(newLogin);
//   section.append(forgotPassword);

//   return section;
// }

// export default login;
