import login from '../src/components/login.js';

describe('login', () => {
  it('should be a function', () => {
    expect(typeof login).toBe('function');
  });
  it('should return a HTML element', () => {
    expect(login()).toBeInstanceOf(HTMLElement);
  });
  it('should return a section element with a class name container', () => {
    expect(login().className).toBe('container');
  });
  it('should return a section element with a child element', () => {
    expect(login().children).toHaveLength(8);
  });
  it('should navigate to "/" when click homeImg', () => {
    const navigateTo = jest.fn();
    const section = login(navigateTo);
    const homeImg = section.querySelector('.iconImg');
    homeImg.click();
    expect(navigateTo).toHaveBeenCalledWith('/');
  });
  it('should navigate to "/register" when click registerAnchor', () => {
    const navigateTo = jest.fn();
    const section = login(navigateTo);
    const registerAnchor = section.querySelector('a');
    registerAnchor.click();
    expect(navigateTo).toHaveBeenCalledWith('/register');
  });
  it('should execute loginUser con email, password and mensaje as arguments when click btnLogin', () => {
    const navigateTo = jest.fn();
    const section = login(navigateTo);
    const btnLogin = section.querySelector('.btnLogin');
    const loginUser = jest.fn();
    btnLogin.addEventListener('click', () => {
      loginUser('email', 'password', 'mensaje');
    });
    btnLogin.click();
    expect(loginUser).toHaveBeenCalledWith('email', 'password', 'mensaje');
  });
  it('should navigate to /forgotPassword when click passAnchor', () => {
    const navigateTo = jest.fn();
    const section = login(navigateTo);
    const passAnchor = section.querySelector('#passAnchor');
    passAnchor.click();
    expect(navigateTo).toHaveBeenCalledWith('/forgotPassword');
  });
});
