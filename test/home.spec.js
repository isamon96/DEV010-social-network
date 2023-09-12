import home from '../src/components/home.js';

const DOM = document.createElement('section');

const navigateToMockHome = jest.fn();

describe('Testing home component', () => {
  let homeComponent;

  beforeEach(() => {
    homeComponent = home(navigateToMockHome);
    DOM.appendChild(homeComponent);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();
  });

  it('Must be a function', () => {
    expect(typeof home).toBe('function');
  });

  test('home function should return a section element', () => {
    const section = home();
    expect(section.tagName).toBe('SECTION');
  });
  
  it('Should navigate to about when clicking the button', async () => {
    // Comprueba que el evento de clic en 'chevron' redirige correctamente
    const chevron = homeComponent.querySelector('.chevronIcon');
    chevron.click();
    expect(navigateToMockHome).toHaveBeenCalledWith('/about'); // Verifica que se llamó con el argumento '/'
  });
});
