function feed(navigateTo) {
  const section = document.createElement('section');
  const logoImg = document.createElement('img');
  logoImg.className = 'logoImg';
  logoImg.alt = 'Logo de la página';
  logoImg.src = '../assets/logo.png';
  section.appendChild(logoImg);

  logoImg.addEventListener('click', () => {
    navigateTo('/');
  });
  return section;
}

export default feed;
