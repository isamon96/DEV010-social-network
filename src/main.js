import home from './components/home.js';
import login from './components/login.js';
import error from './components/error.js';
import registrar from './components/registrar.js';
import about from './components/about.js';

const root = document.getElementById('root');
/* eslint-disable */
const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);

  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  root.appendChild(rutas[pathname]);
};


const rutas = {
  '/': home(onNavigate),
  '/login': login(onNavigate),
  '/error': error(onNavigate),
  '/registrar': registrar(onNavigate),
  '/about': about(onNavigate),
  // '/FotoPerfil': FotoPerfil(onNavigate),
  // '/PerfilUsuario': PerfilUsuario(onNavigate),
};
/* eslint-enable */
const component = () => rutas[window.location.pathname];

window.onpopstate = () => {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(rutas[window.location.pathname]);
};

root.appendChild(component());
