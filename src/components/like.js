// import {
//   updateProfile,
// } from 'firebase/auth';
import { db, auth } from '../firebase';

// Selecciono el botón y contador con querySelector
// Defino estado liked y contador count
// En el click alterno el estado y actualizo estilos
// Incremento/decremento el contador según liked
// Actualizo el innerText del contador

// Crear botón like
const likeButton = document.querySelector('button');
likeButton.id = 'like-button';

// Crea la imagen
const img = document.createElement('img');
img.src = 'heart.png';

// Crea el contador
const counter = document.createElement('span');
counter.id = 'like-counter';
counter.innerText = '0';

// Obtén el contador
const likeCounter = document.querySelector('#like-counter');

// Estado del botón
let liked = false;

// Contador
let count = 0;

// Añade manejador de clics
likeButton.addEventListener('click', () => {
  // Alterna estado
  liked = !liked;

  // Actualiza estilos
  if (liked) {
    likeButton.style.color = 'blue';
  } else {
    likeButton.style.color = 'black';
  }

  // Actualiza contador
  liked ? count++ : count--;
  likeCounter.innerText = count;
});

likeButton.appendChild(img);
document.body.appendChild(likeButton);
// Agrega el contador al DOM
document.body.appendChild(counter);

export {
  likeButton,
};