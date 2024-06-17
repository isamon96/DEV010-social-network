function home(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h3');
  const button = document.createElement('button');
  button.classList.add('buttons');
  const slogan = document.createElement('p');
  const contentSection = document.createElement('section');
  contentSection.className = 'contentSection';
  const elementsSection = document.createElement('section');
  elementsSection.className = 'elementsSection';

  const logoImgPlus = document.createElement('img');
  const chevron = document.createElement('img');

  section.className = 'container';
  logoImgPlus.src = './assets/re+.png';
  logoImgPlus.alt = 'logo de re+';
  logoImgPlus.className = 'logoImg';

  chevron.src = './assets/chevron.gif';
  chevron.alt = 'flecha hacia abajo';
  chevron.className = 'chevronIcon';

  button.textContent = 'Entrar';
  title.textContent = 'ACERCA DE';
  title.className = 'slogan';

  slogan.textContent = 'Conectando personas por un mundo más sostenible';
  slogan.className = 'slogan';

  button.addEventListener('click', () => {
    navigateTo('/login');
  });

  chevron.addEventListener('click', () => {
    navigateTo('/about');
  });

  elementsSection.append(slogan, button, title, chevron);
  contentSection.append(logoImgPlus, elementsSection);
  section.appendChild(contentSection);

  return section;
}

export default home;
