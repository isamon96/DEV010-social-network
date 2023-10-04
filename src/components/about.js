// Crear un elemento de sección
function about(navigateTo) {
  const section = document.createElement('section');
  section.className = 'container';

  // Función para crear un elemento de imagen con clase y fuente
  function createImgWithClass(className, src) {
    const img = document.createElement('img');
    img.className = className;
    img.src = src;
    return img;
  }

  // Función para crear un div con clase y texto opcional
  function createDivWithClass(className, textContent) {
    const div = document.createElement('testDiv');
    div.className = className;
    div.textContent = textContent || '';
    return div;
  }

  // Crear elementos hijos
  // const returnDiv = createDivWithClass('return', 'REGRESAR');
  const reDiv = createDivWithClass('re', 'Bienvenid@ a re+');
  const misionDiv = createDivWithClass('mision', 'MISIÓN');
  const whatDiv = createDivWithClass('what', 'Creemos que cada pequeño esfuerzo suma, y a través de la educación, la inspiración y la colaboración, podemos hacer una diferencia significativa en la preservación de nuestro hogar.');
  const planetImg = createImgWithClass('planetImg', './assets/planet.png');
  const logoIconImg = createImgWithClass('logoIconImg', './assets/re+mini.png');
  const chevron = createImgWithClass('chevronIcon', './assets/chevron.gif');

  chevron.addEventListener('click', () => {
    navigateTo('/');
  });

  // Agregar elementos hijos a la sección
  section.append(chevron, reDiv, logoIconImg, misionDiv, whatDiv, planetImg);
  return section;
}

export default about;
