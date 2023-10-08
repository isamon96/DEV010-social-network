import about from '../src/components/about.js';

describe('about', () => {
  it('should be a function', () => {
    expect(typeof about).toBe('function');
  });

  it('should return a section element', () => {
    const section = about();
    expect(section.tagName).toBe('SECTION');
  });

  it('should contain a chevron element', () => {
    const section = about();
    const chevron = section.querySelector('.chevronIcon');
    expect(chevron).toBeTruthy();
  });

  it('should contain a reDiv element', () => {
    const section = about();
    const reDiv = section.querySelector('.re');
    expect(reDiv).toBeTruthy();
  });

  it('should contain a logoIconImg element', () => {
    const section = about();
    const logoIconImg = section.querySelector('.logoIconImg');
    expect(logoIconImg).toBeTruthy();
  });

  it('should contain a misionDiv element', () => {
    const section = about();
    const misionDiv = section.querySelector('.mision');
    expect(misionDiv).toBeTruthy();
  });

  it('should contain a whatDiv element', () => {
    const section = about();
    const whatDiv = section.querySelector('.what');
    expect(whatDiv).toBeTruthy();
  });

  it('should contain a planetImg element', () => {
    const section = about();
    const planetImg = section.querySelector('.planetImg');
    expect(planetImg).toBeTruthy();
  });
  it('should navigate to / when chevron is clicked', () => {
    const navigateTo = jest.fn();
    const section = about(navigateTo);
    const chevron = section.querySelector('.chevronIcon');
    chevron.click();
    expect(navigateTo).toHaveBeenCalledWith('/');
  });
});
