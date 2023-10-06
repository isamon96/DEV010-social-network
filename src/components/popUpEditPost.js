function popUpEditPost(title, content) {
  return new Promise((resolve) => {
    const dialog = document.createElement('dialog');
    dialog.className = 'popup-container';
    const popUpSection = document.createElement('section');
    popUpSection.className = 'popUpSection';

    const titleText = document.createElement('p');
    titleText.textContent = 'Título';
    const titleTextArea = document.createElement('textarea');
    titleTextArea.value = title;

    const contentText = document.createElement('p');
    contentText.textContent = 'Contenido';
    const contentTextArea = document.createElement('textarea');
    contentTextArea.value = content;

    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.textContent = 'Guardar';
    saveButton.addEventListener('click', () => {
      const editedTitle = titleTextArea.value;
      const editedContent = contentTextArea.value;
      resolve({ title: editedTitle, content: editedContent });
      dialog.close();
    });

    const cancelButton = document.createElement('button');
    cancelButton.id = 'cancelButton';
    cancelButton.textContent = 'Cancelar';
    cancelButton.addEventListener('click', () => {
      dialog.close();
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
  });
}

export default popUpEditPost;
