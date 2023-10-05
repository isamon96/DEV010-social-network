import home from './components/home.js';
import login from './components/login.js';
import error from './components/error.js';
import register from './components/register.js';
import about from './components/about.js';
import forgotPassword from './components/forgotPassword.js';
import feed from './components/feed.js';
import profile from './components/profile.js';
import navigationBar from './components/navigationBar.js';

const rutas = {
  '/': home,
  '/login': login,
  '/error': error,
  '/register': register,
  '/about': about,
  '/forgotPassword': forgotPassword,
  '/feed': feed,
  '/profile': profile,
  '/navigationBar': navigationBar,
};
// sistema de ruteo, se obtiene un elemento del documento HTML con el ID "root" 
// "getElementById" y se almacena en la variable root. 
const root = document.getElementById('root');
// "onNavigate" es una función que toma un argumento "pathname", que representa la ruta que se desea navegar.
const onNavigate = (pathname) => {
// se utiliza para actualizar la URL del navegador sin recargar la página
  window.history.pushState({}, pathname, window.location.origin + pathname);
// El "bucle while" (root.firstChild) se utiliza para eliminar todos los elementos hijos (contenido) 
// del elemento con ID "root". 
// Esto se hace para limpiar el contenido existente antes de cargar una nueva vista.
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
//se utiliza para agregar una nueva vista
// La vista se obtiene desde un objeto rutas basado en la pathname proporcionada como argumento, 
// y se le pasa la función onNavigate para permitir la navegación continua en la aplicación
  root.appendChild(rutas[pathname](onNavigate));
};
// "window.onpopstate" es un evento que se dispara cuando el usuario navega hacia atrás o hacia adelante en la historia del navegado
window.onpopstate = () => {
// Bucle "while" elimina todos los elementos hijos (firstChild)
  while (root.firstChild) {
  // Se dispara este evento, se ejecuta la función que elimina el contenido actual de root y 
  // carga la vista correspondiente según la pathname actual en la URL.
    root.removeChild(root.firstChild);
  }
  root.appendChild(rutas[window.location.pathname](onNavigate));
};
// Se utiliza para inicializar la aplicación cargando la vista correspondiente a la pathname actual en la URL.
// La función onNavigate se utiliza para permitir la navegación en la aplicación.
root.appendChild(rutas[window.location.pathname](onNavigate));