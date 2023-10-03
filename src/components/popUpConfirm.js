function popUpConfirm(message) {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.className = 'popup-container';
    const popUpSection = document.createElement('section');
    popUpSection.className = 'popUpSection';
    const popupMessage = document.createElement('p');
    popupMessage.textContent = message;
    const yesButton = document.createElement('button');
    yesButton.className = 'buttonEdit';
    yesButton.textContent = 'Sí';
    yesButton.addEventListener('click', () => {
      resolve(true);
      dialog.close();
    });
    const noButton = document.createElement('button');
    noButton.textContent = 'No';
    noButton.className = 'buttonEdit';
    noButton.addEventListener('click', () => {
      resolve(false);
      dialog.close();
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
