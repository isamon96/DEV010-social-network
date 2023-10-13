function popUpEditPost(title, content) {
  // La fx crea un cuadro de diálogo emergente para editar un título y contenido de una publicación
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.className = 'popup-container';
    const popUpSection = document.createElement('section');
    popUpSection.className = 'popUpSection';

    const titleText = document.createElement('h3');
    titleText.textContent = 'Título';
    const titleTextArea = document.createElement('textarea');
    titleTextArea.value = title;

    const contentText = document.createElement('h3');
    contentText.textContent = 'Contenido';
    const contentTextArea = document.createElement('textarea');
    contentTextArea.value = content;

    const saveButton = document.createElement('button');
    saveButton.className = 'buttonEdit';
    saveButton.textContent = 'Guardar';

    saveButton.addEventListener('click', () => {
      // agrega un evento de clic al botón guardar
      const editedTitle = titleTextArea.value;
      const editedContent = contentTextArea.value;
      // se obtienen los valores de los campos de texto "titleTextArea" y "contentTextArea"
      resolve({ title: editedTitle, content: editedContent });
      // se resuelve una promesa con un objeto que contiene el título y el contenido editados
      dialog.close();
      // se cierra el cuadro de diálogo
    });

    const cancelButton = document.createElement('button');
    cancelButton.className = 'buttonEdit';
    cancelButton.textContent = 'Cancelar';
    cancelButton.addEventListener('click', () => {
      dialog.close();
      // si se hace clic en el botón de cancelar, simplemente se cierra el cuadro de diálogo.
    });

    popUpSection.appendChild(titleText);
    popUpSection.appendChild(titleTextArea);
    popUpSection.appendChild(contentText);
    popUpSection.appendChild(contentTextArea);
    popUpSection.appendChild(saveButton);
    popUpSection.appendChild(cancelButton);
    dialog.appendChild(popUpSection);
    document.body.appendChild(dialog);
    dialog.showModal();
    // se muestra el cuadro de diálogo utilizando el método showModal() del elemento dialog
  });
}

export default popUpEditPost;
