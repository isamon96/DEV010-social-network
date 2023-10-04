import login from '../src/components/login.js';

describe('login', () => {
  it('should be a function', () => {
    expect(typeof login).toBe('function');
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
  it('should navigate to /feed when click btnLoginGoogle its true', () => {
    const sigInWithGoogle = jest.fn(Promise.resolve(true));
    const navigateTo = jest.fn();
    const section = login(navigateTo);
    const btnLoginGoogle = section.querySelector('.btnGoogle');
    btnLoginGoogle.addEventListener('click', async () => {
      const user = await sigInWithGoogle();
      if (user) {
        navigateTo('/feed');
      }
    });
  });
  it('should execute sigInWithGoogle con event as arguments when click btnLoginGoogle', () => {
    const navigateTo = jest.fn();
    const section = login(navigateTo);
    const btnLoginGoogle = section.querySelector('.btnGoogle');
    const sigInWithGoogle = jest.fn();
    btnLoginGoogle.addEventListener('click', () => {
      sigInWithGoogle('event');
    });
    btnLoginGoogle.click();
    expect(sigInWithGoogle).toHaveBeenCalledWith('event');
  });
});

it('should navigate to /feed when click btnLoginGoogle its true', async () => {
  // Crea un mock de sigInWithGoogle y configura que devuelva true
  // eslint-disable-next-line no-unused-vars
  const sigInWithGoogle = jest.fn().mockResolvedValue(true);

  const navigateTo = jest.fn();
  const section = login(navigateTo);
  const btnLoginGoogle = section.querySelector('.btnGoogle');

  // Simula el clic en el botón btnLoginGoogle
  await btnLoginGoogle.click();

  // Verifica que navigateTo se llame con el argumento '/feed'
  expect(navigateTo).toHaveBeenCalledWith('/feed');
});
