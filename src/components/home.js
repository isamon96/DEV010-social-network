function home(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const button = document.createElement('button');
  const slogan = document.createElement('p');

  const logoImgPlus = document.createElement('img');
  const chevron = document.createElement('img');

  section.className = 'container';
  logoImgPlus.src = './assets/re+.png';
  logoImgPlus.alt = 'logo de re+';
  logoImgPlus.className = 'logoImgPlus';

  chevron.src = './assets/chevron.gif';
  chevron.alt = 'flecha hacia abajo';
  chevron.className = 'chevronIcon';

  button.textContent = 'ENTRAR';
  title.textContent = 'ACERCA DE';
  title.className = 'acercaDe';

  slogan.textContent = 'Conectando personas por un mundo más sostenible';
  slogan.className = 'slogan';

  button.addEventListener('click', () => {
    navigateTo('/login');
  });

  chevron.addEventListener('click', () => {
    navigateTo('/about');
  });

  section.append(logoImgPlus, slogan, button, title, chevron);


  return section;
}

export default home;
