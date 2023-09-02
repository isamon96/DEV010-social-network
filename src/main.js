import home from './components/home.js';
import login from './components/login.js';
import error from './components/error.js';
// import registrar from './components/registrar.js';

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
  // '/registrar': registrar(onNavigate),
  // '/Registro': registroCorreo(onNavigate),
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

// // Este es el punto de entrada de tu aplicacio
// // Nos permitirá controlar todo lo relacionado con la manipulación del DOM en nuestras rutas

// // import { myFunction } from './.app/lib/index.js';
// import home from './components/home.js';
// import login from './components/login.js';
// import error from './components/error.js';

// // myFunction();

// const routes = [
//   { path: '/', component: home },
//   { path: '/login', component: login },
//   { path: '/error', component: error },
// ];

// const defaultRoute = '/';
// const root = document.getElementById('root');

// function navigateTo(hash) {
//   const route = routes.find((routeFound) => routeFound.path === hash);

//   if (route && route.component) {
//     window.history.pushState(
//       {},
//       route.path,
//       window.location.origin + route.path,
//     );

//     if (root.firstChild) {
//       root.removeChild(root.firstChild);
//     }
//     root.appendChild(route.component(navigateTo));
//   } else {
//     navigateTo('/error');
//   }
// }

// window.onpopstate = () => {
//   navigateTo(window.location.pathname);
// };

// navigateTo(window.location.pathname || defaultRoute);

// root.appendChild(home(navigateTo));
