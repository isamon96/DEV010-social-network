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
