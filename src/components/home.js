function home(navigateTo) {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  const button = document.createElement('button');

  button.textContent = 'login';
  title.textContent = 'Welcome to green';

  button.addEventListener('click', () => {
    navigateTo('/login');
  });

  section.append(title);
  section.append(button);
  return section;
}

export default home;
