import {
  updatePassword,
} from 'firebase/auth';
import { auth } from '../firebase';

const newPassword = 'nueva_contraseña';
// import { signOutUser } from '../lib/auth';
// import { signOut } from '@firebase/auth';
import navigationBar from './navigationBar';

function profile(navigateTo) {
  const section = document.createElement('section');
  section.className = 'container';

  const header = document.createElement('header');
  header.className = 'header';

  const logoImg = document.createElement('img');
  logoImg.className = 'logoImgFeed';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  const profileSection = document.createElement('section');
  profileSection.className = ('profileSection');

  const profileTitle = document.createElement('h3');
  profileTitle.classList.add('profileTitle');
  profileTitle.textContent = 'Profile';

  const btnSignOut = document.createElement('button');
  btnSignOut.className = 'buttons';
  btnSignOut.textContent = 'Cerra sesión';
  //   botonSignOut.addEventListener('click', async (e) => {
  //     e.preventDefault(e);
  //     await signOutUser();
  //     navigateTo('/');
  //   });

  const nameProfile = document.createElement('h2');
  nameProfile.className = 'nameProfile';
  // nameProfile.textContent = user.displayName;

  const email = document.createElement('input');
  email.placeholder = 'Aquí aparecerá el correo del usuario';
  email.className = 'email'; // asiganmos al input el valor del correo del usuario de firebase
  //   email.value = user.email; // Deshabilitamos el input para que sea solo de lectura
  //   email.setAttribute('disabled', true); // Label de titulo para post del usuario
  //   const h3 = document.createElement('h3'); // Titulo post of user
  //   h3.textContent = `Posts of ${user.displayName}`;

  const footer = document.createElement('footer');
  footer.className = ('footer');

  section.append(header, profileSection, footer);
  header.append(logoImg);
  profileSection.append(profileTitle, nameProfile, email, btnSignOut);
  footer.appendChild(navigationBar(navigateTo));

  return section;
}

export default profile;
