import error from '../src/components/error.js';

const DOM = document.createElement('section');

const navigateToMockError = jest.fn();

describe('Testing error component', () => {
  let errorComponent;

  beforeEach(() => {
    errorComponent = error(navigateToMockError);
    DOM.appendChild(errorComponent);
  });
  // el contenido del elelmento body en una cadena vacía y luego la elimina con clearAllMocks()
  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('Must be a function', () => {
    // funcion de error
    expect(typeof error).toBe('function');
  });

  test('error function should return a section element', () => {
    // Utiliza la variable errorComponent en lugar de aboutComponent
    expect(errorComponent.tagName).toBe('SECTION');
  });
});
