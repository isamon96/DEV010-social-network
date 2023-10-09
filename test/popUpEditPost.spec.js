import popUpEditPost from '../src/components/popUpEditPost.js';

HTMLDialogElement.prototype.showModal = jest.fn();
HTMLDialogElement.prototype.close = jest.fn();
HTMLDialogElement.prototype.show = jest.fn();

describe('popUpEditPost', () => {
  test('should be a function', () => {
    expect(typeof popUpEditPost).toBe('function');
  });
  test('should return a promise', () => {
    expect(popUpEditPost('test', 'test')).toBeInstanceOf(Promise);
  });
  test('should return an object with title and content when click saveButton', () => {
    popUpEditPost('test', 'test').then((result) => {
      expect(result).toEqual({ title: 'test', content: 'test' });
    });
    document.getElementById('saveButton').click();
  });
  test('should return undefined when click cancelButton', () => {
    popUpEditPost('test', 'test').then((result) => {
      expect(result).toBe(undefined);
    });
    document.getElementById('cancelButton').click();
  });
});
