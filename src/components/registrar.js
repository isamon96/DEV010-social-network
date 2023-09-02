// import { createUser } from '../lib/index.js';

// function registrar(navigateTo) {
//   const section = document.createElement('section');
//   const title = document.createElement('h2');
//   const buttonReturn = document.createElement('button');
//   const form = document.createElement('form');
//   const inputEmail = document.createElement('input');
//   const inputPass = document.createElement('input');
//   const registrarButton = document.createElement('button');

//   inputEmail.placeholder = 'Write email';
//   inputPass.placeholder = 'pass';

//   title.textContent = 'Registrar';
//   buttonReturn.textContent = 'Return to home';
//   registrarButton.textContent = 'Registrar';
//   buttonReturn.addEventListener('click', () => {
//     navigateTo('/');
//   });

//   registrarButton.addEventListener('click', (event) => {
//     event.preventDefault();
//     const email = inputEmail.value;
//     const password = inputPass.value;
//     createUser(email, password);
//   });

//   form.append(inputEmail, inputPass, registrarButton);
//   section.append(title, form, buttonReturn);

//   return section;
// }

// export default registrar;
