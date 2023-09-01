function home(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const button = document.createElement('button');
  const slogan = document.createElement('p');
  const logoInicio = document.createElement('img');
  const chevron = document.createElement('img');

  logoInicio.src = './assets/re+.png';
  logoInicio.alt = 'logo de re+';
  logoInicio.className = 'logoInicio';

  chevron.src = './assets/chevron.gif';
  chevron.alt = 'flecha hacia abajo';
  chevron.className = 'chevronIcon';

  button.textContent = 'Entrar';
  title.textContent = 'ACERCA DE';
  title.className = 'acercaDe';

  slogan.textContent = 'Conectando personas por un mundo más sostenible';
  slogan.className = 'slogan';

  button.addEventListener('click', () => {
    navigateTo('/login');
  });

  section.append(logoInicio);
  section.append(slogan);
  section.append(button);
  section.append(title);
  section.append(chevron);
  return section;
}

export default home;