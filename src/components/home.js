function home(navigateTo) {
  const section = document.createElement('section');
  const acercaDe = document.createElement('h2');
  const button = document.createElement('button');
  const slogan = document.createElement('p');
  const img = document.createElement('img');
  const chevron = document.createElement('figure');

  img.src = './assets/re+.png';
  img.alt = 'logo de re+';
  chevron.src = './assets/chevron.png';
  chevron.alt = 'flecha hacia abajo';
  button.textContent = 'Entrar';
  acercaDe.textContent = 'Acerca de';
  slogan.textContent = 'Conectando personas por un mundo más sostenible';

  button.addEventListener('click', () => {
    navigateTo('/login');
  });

  section.append(img);
  section.append(slogan);
  section.append(button);
  section.append(acercaDe);
  section.append(chevron);
  return section;
}

export default home;
