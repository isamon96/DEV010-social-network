function popUpConfirm(message) {
  // la fx crea un cuadro de diálogo emergente con un mensaje y dos botones: sí y no
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.className = 'popup-container';
    const popUpSection = document.createElement('section');
    popUpSection.className = 'popUpSection';
    const popupMessage = document.createElement('p');
    popupMessage.textContent = message;
    const yesButton = document.createElement('button');
    yesButton.textContent = 'Sí';
    yesButton.id = 'yesButton';

    yesButton.addEventListener('click', () => {
      resolve(true);
      dialog.close();
      // devuelve una promesa que se resuelve con el valor true cuando se hace clic en el botón "Sí"
      // y se cierra el cuadro de diálogo
    });

    const noButton = document.createElement('button');
    noButton.textContent = 'No';
    noButton.id = 'noButton';

    noButton.addEventListener('click', () => {
      resolve(false);
      dialog.close();
      // o se resuelve con el valor false cuando se hace clic en el botón "No"
      // y se cierra el cuadro de diálogo
    });

    popUpSection.appendChild(popupMessage);
    popUpSection.appendChild(yesButton);
    popUpSection.appendChild(noButton);
    dialog.appendChild(popUpSection);
    document.body.appendChild(dialog);
    dialog.showModal();
  });
}
export default popUpConfirm;
