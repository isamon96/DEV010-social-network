import {
  updatePassword,
} from 'firebase/auth';
import { auth } from '../firebase';

const newPassword = 'nueva_contraseña';
// import { signOutUser } from '../lib/auth';
import navigationBar from './navigationBar';

function profile(navigateTo) {
  const section = document.createElement('section');
  section.className = 'container';

  const header = document.createElement('header');
  header.classList.add('header');

  const profileTitle = document.createElement('h2');
  profileTitle.classList.add('profileTitle');
  profileTitle.textContent = 'Profile';

  const logoImg = document.createElement('img');
  logoImg.className = 'logoImgFeed';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  //   const botonSignOut = document.createElement('button');
  //   botonSignOut.classList.add('btbSignOut');
  //   botonSignOut.textContent = 'Sign Out';
  //   botonSignOut.addEventListener('click', async (e) => {
  //     e.preventDefault(e);
  //     await signOutUser();
  //     navigateTo('/');
  //   });

  const nameProfile = document.createElement('h2');
  nameProfile.classList.add('nameProfile');
  // nameProfile.textContent = user.displayName;

  const email = document.createElement('input');
  email.classList.add('email'); // asiganmos al input el valor del correo del usuario de firebase
  //   email.value = user.email; // Deshabilitamos el input para que sea solo de lectura
  //   email.setAttribute('disabled', true); // Label de titulo para post del usuario
  //   const h3 = document.createElement('h3'); // Titulo post of user
  //   h3.textContent = `Posts of ${user.displayName}`;

  const footer = document.createElement('footer');

  section.append(header, profileTitle, logoImg, nameProfile, email, footer,);
  header.append(logoImg);
  footer.appendChild(navigationBar(navigateTo));

  return section;
}

export default profile;
