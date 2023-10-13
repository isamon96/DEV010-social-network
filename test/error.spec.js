import error from '../src/components/error.js';

const DOM = document.createElement('section');

const navigateToMockError = jest.fn();
// crea una fx simulada utilizando la biblioteca de Jest
// se puede utilizar para simular la navegación a un error en una prueba unitaria o de integración

describe('Testing error component', () => {
  let errorComponent;

  beforeEach(() => {
    errorComponent = error(navigateToMockError);
    DOM.appendChild(errorComponent);
  });
  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('Must be a function', () => {
    // funcion de error
    expect(typeof error).toBe('function');
  });

  test('error function should return a h2 element', () => {
    // Utiliza la variable errorComponent en lugar de aboutComponent
    expect(errorComponent.tagName).toBe('H2');
  });
});
