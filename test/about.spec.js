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
    // Corrige el nombre de la función a probar (debe ser 'about' en lugar de 'home')
    expect(typeof about).toBe('function');
  });

  test('about function should return a section element', () => {
    // Utiliza la variable aboutComponent en lugar de crear una nueva instancia
    expect(aboutComponent.tagName).toBe('SECTION');
  });

  it('Should navigate to home when clicking the button', async () => {
    // Comprueba que el evento de clic en 'chevron' redirige correctamente
    const chevron = aboutComponent.querySelector('.chevronIcon');
    chevron.click();
    expect(navigateToMockAbout).toHaveBeenCalledWith('/'); // Verifica que se llamó con el argumento '/'
  });
});
