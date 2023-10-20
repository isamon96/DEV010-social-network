import popUpConfirm from '../src/components/popUpConfirm';

HTMLDialogElement.prototype.showModal = jest.fn();
HTMLDialogElement.prototype.close = jest.fn();
HTMLDialogElement.prototype.show = jest.fn();
// crea fxs simuladas en el prototipo de HTMLDialogElement

describe('popUpConfirm', () => {
  test('should be a function', () => {
    expect(typeof popUpConfirm).toBe('function');
  });
  test('should return a promise', () => {
    expect(popUpConfirm('test')).toBeInstanceOf(Promise); // verifica si el obj es una instancia de una clase específica
  });
  test('should return true when click yesButton', () => {
    popUpConfirm('test').then((result) => {
      expect(result).toBe(true);
    });
    document.getElementById('yesButton').click();
  });
  test('should return false when click noButton', () => {
    popUpConfirm('test').then((result) => {
      expect(result).toBe(false);
    });
    document.getElementById('noButton').click();
  });
});
