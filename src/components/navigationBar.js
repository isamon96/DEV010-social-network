function navigationBar(navigateTo) {
  const barContainer = document.createElement('section');
  barContainer.className = 'buttonsContainer';

  const homeButton = document.createElement('button');
  homeButton.textContent = 'Home';
  homeButton.id = 'homeButton';
  homeButton.className = 'navigationButtons';

  const feedButton = document.createElement('button');
  feedButton.textContent = 'Feed';
  feedButton.className = 'navigationButtons';
  feedButton.id = 'feedButton';

  const profileButton = document.createElement('button');
  profileButton.textContent = 'Profile';
  profileButton.className = 'navigationButtons';
  profileButton.id = 'profileButton';

  homeButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/login');
  });

  feedButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/feed');
  });

  profileButton.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo('/profile');
  });

  if (window.location.pathname === '/login') {
    homeButton.style.color = '#FFB11E';
    homeButton.style.fontSize = '1.2rem';
    homeButton.innerHTML = '<b>Home 🌎</b>';
    feedButton.style.color = 'black';
    profileButton.style.color = 'black';
  } else if (window.location.pathname === '/feed') {
    homeButton.style.color = 'black';
    feedButton.style.color = '#FFB11E';
    feedButton.style.fontSize = '1.2rem';
    feedButton.innerHTML = '<b>Feed 🌱</b>';
    profileButton.style.color = 'black';
  } else if (window.location.pathname === '/profile') {
    homeButton.style.color = 'black';
    feedButton.style.color = 'black';
    profileButton.style.color = '#FFB11E';
    profileButton.style.fontSize = '1.2rem';
    profileButton.innerHTML = '<b>Profile 👤</b>';
  }
  // Modificar para que estén los estilos en CSS
  // Estado del botón

  barContainer.append(homeButton, feedButton, profileButton);
  return barContainer;
}

export default navigationBar;
