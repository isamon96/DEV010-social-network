function error() {
  const section = document.createElement('section'); // se crea sección para que sea un valor real, cree y devuelva un elemento 
  const title = document.createElement('p');
  title.className = 'slogan';
  title.textContent = 'Error 404 page no found, please go home';
  section.appendChild(title);
  return title;
}

export default error;
