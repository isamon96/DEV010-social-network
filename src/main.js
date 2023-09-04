import home from './components/home.js';
import login from './components/login.js';
import error from './components/error.js';
import registrar from './components/registrar.js';

const root = document.getElementById('root');

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
  // '/FotoPerfil': FotoPerfil(onNavigate),
  // '/PerfilUsuario': PerfilUsuario(onNavigate),
};

const component = () => rutas[window.location.pathname];

window.onpopstate = () => {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(rutas[window.location.pathname]);
};

root.appendChild(component());
