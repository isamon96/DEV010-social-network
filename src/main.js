import home from './components/home.js';
import login from './components/login.js';
import error from './components/error.js';
import register from './components/register.js';
import about from './components/about.js';
import forgotPassword from './components/forgotPassword.js';
import feed from './components/feed.js';
import profile from './components/profile.js';
import navigationBar from './components/navigationBar.js';
// importa varios componentes de diferentes archivos y los asigna a rutas específicas

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

const root = document.getElementById('root');
const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);
  // se utiliza pushState para cambiar la URL en el historial del navegador
  while (root.firstChild) {
    root.removeChild(root.firstChild);
    // se eliminan todos los elementos hijos del elemento con el id 'root'
  }

  root.appendChild(rutas[pathname](onNavigate));
  // agrega un nuevo componente al elemento 'root' según la ruta especificada
};

window.onpopstate = () => {
  // se ejecuta cuando el usuario navega hacia atrás o hacia adelante en la historia del navegador
  while (root.firstChild) {
    root.removeChild(root.firstChild);
    // se ejecuta cuando el usuario navega hacia atrás o hacia adelante en la historia del navegador
  }
  root.appendChild(rutas[window.location.pathname](onNavigate));
  // componente se obtiene del objeto 'rutas' utilizando la ruta de la ubicación actual como clave
};

root.appendChild(rutas[window.location.pathname](onNavigate));
