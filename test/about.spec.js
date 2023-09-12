import about from '../src/components/about.js';

const DOM = document.createElement('section');

const navigateToMockAbout = jest.fn();

describe('Testing about component', () => {
  let aboutComponent;

  beforeEach(() => {
    aboutComponent = about(navigateToMockAbout);
    DOM.appendChild(aboutComponent);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('Must be a function', () => {
    // Corrige el nombre de la función a probar 
    expect(typeof about).toBe('function');
  });

  test('error function should return error text content', () => {
    // Utiliza la variable aboutComponent en lugar de crear una nueva instancia
    expect(errorComponent.tagName).toBe('SECTION');
  });

});