function error() {
  const section = document.createElement('section'); // se crea sección para que sea un valor real, cree y devuelva un elemento 
  const title = document.createElement('h2');
  title.textContent = 'Error 404 page no found, please go home';
  section.appendChild(title)
  //creando un componente de error que contiene un elemento <section> y un título <h2>
  return title;
}

export default error;
