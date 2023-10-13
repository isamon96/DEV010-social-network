function navigationBar(navigateTo) {
  const barContainer = document.createElement('section');
  barContainer.className = 'buttonsContainer';

  const feedButton = document.createElement('button');
  feedButton.textContent = 'Feed';
  feedButton.className = 'navigationButtons';
  feedButton.id = 'feedButton';

  const profileButton = document.createElement('button');
  profileButton.textContent = 'Profile';
  profileButton.className = 'navigationButtons';
  profileButton.id = 'profileButton';

  // crea una barra de navegación con dos botones: feed y profile
  feedButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/feed');
  });

  profileButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/profile');
  });

  if (window.location.pathname === '/feed') {
    feedButton.style.color = '#FFB11E';
    feedButton.style.fontSize = '1.2rem';
    feedButton.innerHTML = '<b>Feed ♻️</b>';
    profileButton.style.color = 'black';
    // si la ruta actual es "/feed", el botón "Feed" se resalta cambiando color y tamaño de fuente
  } else if (window.location.pathname === '/profile') {
    feedButton.style.color = 'black';
    profileButton.style.color = '#FFB11E';
    profileButton.style.fontSize = '1.2rem';
    profileButton.innerHTML = '<b>Profile ♻️</b>';
    // y si es "/profile", el botón "Profile" se resalta cambiando color y tamaño de fuente
  }

  barContainer.append(feedButton, profileButton);
  return barContainer;
}

export default navigationBar;
