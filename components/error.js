function error() {
  const section = document.createElement('section');
  const title = document.createElement('h2');
  title.textContent = 'Error 404 page no found, please go home';
  section.appendChild(title);
  return title;
  // crea un elemento, asigna el texto al contenido del elemento
  // agrega h2 como hijo del elemento
  // finalmente devuelve el elemento
}

export default error;
