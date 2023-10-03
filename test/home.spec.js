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

  it('Should navigate to Login when clicking the button', async () => {
    const buttonLogin = homeComponent.querySelector('button');
    buttonLogin.click();

    expect(navigateToMockHome).toHaveBeenCalledWith('/login');
  });

  it('Should navigate to About when clicking the chevron icon', async () => {
    const chevron = homeComponent.querySelector('.chevronIcon');
    chevron.click();

    expect(navigateToMockHome).toHaveBeenCalledWith('/about');
  });
});
