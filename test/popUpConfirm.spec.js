import popUpConfirm from '../src/components/popUpConfirm.js';

describe('popUpConfirm', () => {
  it('should resolve to true when the user clicks the "Sí" button', async () => {
    const result = await popUpConfirm('¿Estás seguro de que quieres eliminar este archivo?');
    expect(result).toBe(true);
  });
  it('should resolve to false when the user clicks the "No" button', async () => {
    const result = await popUpConfirm('¿Estás seguro de que quieres eliminar este archivo?');
    expect(result).toBe(false);
  });
});

import popUpConfirm from '../src/components/popUpConfirm';

describe('popUpConfirm', () => {
  it('should be a function', () => {
    expect(typeof popUpConfirm).toBe('function');
  });
  it('should return a promise that resolves with true when the user confirms', async () => {
    const mockConfirm = jest.fn(() => Promise.resolve(true));
    const result = await popUpConfirm('Are you sure?', mockConfirm);
    expect(result).toBeInstanceOf(Promise);
    const resolvedValue = await result;
    expect(resolvedValue).toBe(true);
    expect(mockConfirm).toHaveBeenCalledWith('Are you sure?');
  });
});
