import register from '../src/components/register.js';

describe('register', () => {
  it('should be a function', () => {
    expect(typeof register).toBe('function');
  });
  it('should return a HTML element', () => {
    expect(register()).toBeInstanceOf(HTMLElement);
  });
  it('should return a section element with a class name container', () => {
    expect(register().className).toBe('container');
  });
  it('should return a section element with a child element', () => {
    expect(register().children).toHaveLength(5);
  });
  it('should navigate to "/" when click homeImg', () => {
    const navigateTo = jest.fn();
    const section = register(navigateTo);
    const homeImg = section.querySelector('.iconImg');
    homeImg.click();
    expect(navigateTo).toHaveBeenCalledWith('/');
  });
  it('should navigate to "/login" when click loginAnchor', () => {
    const navigateTo = jest.fn();
    const section = register(navigateTo);
    const loginAnchor = section.querySelector('a');
    loginAnchor.click();
    expect(navigateTo).toHaveBeenCalledWith('/login');
  });
  it('should execute createUser con email, password and mensaje as arguments when click registerButton', () => {
    const navigateTo = jest.fn();
    const section = register(navigateTo);
    const registerButton = section.querySelector('#btnRegister');
    const createUser = jest.fn();
    registerButton.addEventListener('click', () => {
      createUser('email', 'password', 'mensaje');
    });
    registerButton.click();
    expect(createUser).toHaveBeenCalledWith('email', 'password', 'mensaje');
  });
});
