import { signOutUser, obtainUserInfo } from '../lib/index.js';
import navigationBar from './navigationBar';

function profile(navigateTo) {
  obtainUserInfo().then((user) => {
    if (user) {
      // verifica si el usuario existe y actualiza los elementos HTML con la info
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const imgProfile = document.getElementById('imgProfile');
      name.textContent = user.name;
      email.textContent = user.email;
      if (user.imgProfile) {
        imgProfile.src = user.imgProfile;
        // si tiene imagen de perfil, se establece la fuente en base a la URL proporcionada
      } else {
        const firstLetter = user.name.charAt(0).toUpperCase();
        imgProfile.src = `https://ui-avatars.com/api/?name=${firstLetter}&background=C992D2&rounded=true&color=fff`;
        // de lo contrario, se genera una imagen de avatar utilizando las iniciales del nombre
      }
      return user;
    }
    return false;
  });

  const section = document.createElement('section');
  section.className = 'container';

  const header = document.createElement('header');
  header.className = 'header';

  const logoImg = document.createElement('img');
  logoImg.className = 'logoImgFeed';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';

  const profileSection = document.createElement('section');
  profileSection.id = 'profileSection';

  const imgProfile = document.createElement('img');
  imgProfile.id = 'imgProfile';

  const name = document.createElement('p');
  name.className = '.userData';
  name.id = 'name';

  const email = document.createElement('p');
  email.className = '.userData';
  email.id = 'email';

  const postsSection = document.createElement('section');
  postsSection.className = 'postsSection';

  const footer = document.createElement('footer');
  footer.className = ('footer');

  const btnSignOut = document.createElement('button');
  btnSignOut.className = 'buttons';
  btnSignOut.id = 'btnSignOut';
  btnSignOut.textContent = 'Cerra sesión';

  btnSignOut.addEventListener('click', async (e) => {
    e.preventDefault(e);
    // evita que la página se recargue
    signOutUser();
    // llama a la fx para cerrar la sesión del usuario
    localStorage.clear();
    // se borra todo el contenido almacenado en el objeto localStorage
    navigateTo('/');
    // se redirige al usuario a la ruta "/" utilizando la función "navigateTo()"
  });

  section.append(header, profileSection, footer);
  header.append(logoImg);
  profileSection.append(imgProfile, name, email, postsSection, btnSignOut);
  footer.appendChild(navigationBar(navigateTo));

  return section;
}

export default profile;
