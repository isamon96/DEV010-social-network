// import { sigInWithGoogle, loginUser } from '../lib/index.js';

// function login(navigateTo) {
//   const section = document.createElement('section');
//   const title = document.createElement('h2');
//   const buttonReturn = document.createElement('button');
//   const form = document.createElement('form');
//   const inputEmail = document.createElement('input');
//   const inputPass = document.createElement('input');
//   const buttonLogin = document.createElement('button');
//   const registrarButton = document.createElement('button');
//   const buttonLoginUser = document.createElement('button');

//   inputEmail.placeholder = 'Write email';
//   inputPass.placeholder = 'pass';

//   title.textContent = 'Login';
//   buttonLogin.textContent = 'google';
//   buttonReturn.textContent = 'Return to home';
//   registrarButton.textContent = 'Registrar';
//   buttonLoginUser.textContent = 'Login';

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

//   form.append(inputEmail, inputPass, buttonLoginUser);
//   section.append(title, form, buttonReturn, registrarButton, buttonLogin);

//   return section;
// }

// export default login;
