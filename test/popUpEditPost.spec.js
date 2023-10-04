import popUpEditPost from '../src/components/popUpEditPost.js';

describe('popUpEditPost', () => {
  it('should resolve to an object with the edited title and content when the user clicks the "Guardar" button', async () => {
    const result = await popUpEditPost('Título', 'Contenido');
    expect(result).toEqual({ title: 'Título editado', content: 'Contenido editado' });
  });
  it('should resolve to undefined when the user clicks the "Cancelar" button', async () => {
    const result = await popUpEditPost('Título', 'Contenido');
    expect(result).toBeUndefined();
  });
});
