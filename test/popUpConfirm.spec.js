import popUpConfirm from '../src/components/popUpConfirm.js';

describe('popUpConfirm', () => {
  // Antes de cada prueba, crearemos un diálogo en el cuerpo del documento
  beforeEach(() => {
    const dialog = document.createElement('dialog');
    dialog.className = 'popup-container';
    dialog.showModal = () => {};
    document.body.appendChild(dialog);
  });

  // Después de cada prueba, eliminaremos el diálogo del cuerpo del documento
  afterEach(() => {
    const dialog = document.querySelector('dialog');
    if (dialog) {
      document.body.removeChild(dialog);
    }
  });

  // eslint-disable-next-line max-len
  // Prueba: Verifica si la función popUpConfirm resuelve con true cuando se hace clic en el botón "Sí"//

  it('should resolve with true when "Sí" button is clicked', async () => {
    // Llamamos a popUpConfirm para obtener la promesa
    const result = popUpConfirm('Test Message');
    // Buscamos el diálogo y el botón "Sí"
    const dialog = document.querySelector('dialog');
    const yesButton = dialog.querySelector('button:nth-child(2)');

    // Simulamos el clic en el botón "Sí"
    yesButton.click();
    // Esperamos a que se resuelva la promesa
    const resolvedValue = await result;

    // Verificamos que la promesa se resuelva con true
    expect(resolvedValue).toBe(true);
  });

  // eslint-disable-next-line max-len
  // Prueba: Verifica si la función popUpConfirm resuelve con false cuando se hace clic en el botón "No"
  it('should resolve with false when "No" button is clicked', async () => {
    // Llamamos a popUpConfirm para obtener la promesa
    const result = popUpConfirm('Test Message');
    // Buscamos el diálogo y el botón "No"
    const dialog = document.querySelector('dialog');
    const noButton = dialog.querySelector('button:nth-child(3)');

    // Simulamos el clic en el botón "No"
    noButton.click();
    // Esperamos a que se resuelva la promesa
    const resolvedValue = await result;

    // Verificamos que la promesa se resuelva con false
    expect(resolvedValue).toBe(false);
  });

  // eslint-disable-next-line max-len
  // Prueba: Verifica si el diálogo se cierra correctamente después de hacer clic en los botones "Sí" o "No"
  it('should close the dialog when buttons are clicked', () => {
    // Llamamos a popUpConfirm para mostrar el diálogo
    popUpConfirm('Test Message');
    // Buscamos el diálogo y los botones "Sí" y "No"
    const dialog = document.querySelector('dialog');
    const yesButton = dialog.querySelector('button:nth-child(2)');
    const noButton = dialog.querySelector('button:nth-child(3)');

    // Simulamos el clic en el botón "Sí"
    yesButton.click();
    // Verificamos que el diálogo se haya cerrado después de hacer clic en "Sí"
    expect(dialog.open).toBe(false);

    // Simulamos el clic en el botón "No"
    noButton.click();
    // Verificamos que el diálogo se haya cerrado después de hacer clic en "No"
    expect(dialog.open).toBe(false);
  });
});
