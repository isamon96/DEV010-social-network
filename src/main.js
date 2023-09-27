import home from './components/home.js';
import login from './components/login.js';
import error from './components/error.js';
import register from './components/register.js';
import about from './components/about.js';
import forgotPassword from './components/forgotPassword.js';
import feed from './components/feed.js';

const rutas = {
  '/': home,
  '/login': login,
  '/error': error,
  '/register': register,
  '/about': about,
  '/forgotPassword': forgotPassword,
  '/feed': feed,
  // '/PerfilUsuario': PerfilUsuario(onNavigate),
};

const root = document.getElementById('root');
/* eslint-disable */
const onNavigate = (pathname) => {
  window.history.pushState({}, pathname, window.location.origin + pathname);

  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  root.appendChild(rutas[pathname](onNavigate));
};


window.onpopstate = () => {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(rutas[window.location.pathname](onNavigate));
};

root.appendChild(rutas[window.location.pathname](onNavigate));
