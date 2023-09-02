// Este es el punto de entrada de tu aplicacion

window.onpopstate = () => {
  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(rutas[window.location.pathname]);
};

root.appendChild(component());
