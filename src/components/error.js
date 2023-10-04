function error() {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  title.textContent = 'Error 404 page no found, please go home';
  section.appendChild(title);
  return title;
}

export default error;
