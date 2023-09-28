import { onAuthStateChanged } from 'firebase/auth';
import { signOutUser, obtainUserInfo, showPosts } from '../lib/index.js';
import navigationBar from './navigationBar';
import { auth } from '../firebase.js';

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

  email.className = 'email'; // asiganmos al input el valor del correo del usuario de firebase
  //   email.value = user.email; // Deshabilitamos el input para que sea solo de lectura
  //   email.setAttribute('disabled', true);

  const postsSection = document.createElement('section');
  postsSection.className = 'postsSection';

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userInfo = obtainUserInfo();
      const photo = auth.currentUser.photoURL;
      nameProfile.textContent = userInfo.displayName;
      email.value = userInfo.email;
      imgProfile.src = user.photoURL;
      if (photo === null || photo === undefined) {
        imgProfile.src = '../assets/user-circle@2x.png';
      }
    }
  });

  const btnSignOut = document.createElement('button');
  btnSignOut.className = 'buttons';
  btnSignOut.textContent = 'Cerra sesión';
  btnSignOut.addEventListener('click', async (e) => {
    e.preventDefault(e);
    signOutUser();
    navigateTo('/');
  });

  const footer = document.createElement('footer');
  footer.className = ('footer');

  section.append(header, profileSection, btnSignOut, footer);
  header.append(logoImg);
  profileSection.append(nameProfile, imgProfile, email, postsSection);
  footer.appendChild(navigationBar(navigateTo));

  return section;
}

export default profile;