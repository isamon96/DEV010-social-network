function createNewPost(navigateTo) {
  const container = document.createElement('div');
  const content = document.createElement('div');
  const contentChild = document.createElement('div');
  const content1 = document.createElement('div');
  const contentItem = document.createElement('div');
  const publicationChild = document.createElement('img');
  const logoIcon = document.createElement('img');
  const publicationItem = document.createElement('div');
  const userPlusIcon = document.createElement('img');
  const attachmentIcon = document.createElement('img');
  const cameraPlusIcon = document.createElement('img');
  const linkIcon = document.createElement('img');
  const publicationInner = document.createElement('div');
  const lineIcon = document.createElement('img');
  const saveIcon = document.createElement('img');
  const buttonorangeContainer = document.createElement('div');
  const entrar = document.createElement('b');

  container.className = 'publication';

  content.className = 'content';
  content1.className = 'content1';
  publicationChild.className = 'publication-child';
  logoIcon.className = 'logo-icon';
  publicationItem.className = 'publication-item';
  userPlusIcon.className = 'user-plus-01-icon';
  attachmentIcon.className = 'attachment-02-icon';
  cameraPlusIcon.className = 'camera-plus-icon';
  linkIcon.className = 'link-02-icon';
  publicationInner.className = 'publication-inner';
  lineIcon.className = 'line-icon';
  saveIcon.className = 'save-01-icon';
  buttonorangeContainer.className = 'buttonorange';

  // Set alt and src attributes for your images here
  publicationChild.alt = '';
  publicationChild.src = './group-3.png';
  logoIcon.alt = '';
  logoIcon.src = './logo@2x.png';
  userPlusIcon.alt = '';
  userPlusIcon.src = './userplus01.png';
  attachmentIcon.alt = '';
  attachmentIcon.src = './attachment02.png';
  cameraPlusIcon.alt = '';
  cameraPlusIcon.src = './cameraplus.png';
  linkIcon.alt = '';
  linkIcon.src = './link02.png';
  lineIcon.alt = '';
  lineIcon.src = './line-22.png';
  saveIcon.alt = '';
  saveIcon.src = './save01.png';

  entrar.textContent = 'Publicar';

  buttonorangeContainer.appendChild(entrar);

  if (buttonorangeContainer) {
    buttonorangeContainer.addEventListener('click', function (e) {
      // Please sync "Login" to the project
    });
  }

  // Append all elements to the container in the desired order
  content.appendChild(contentChild);
  content1.appendChild(contentItem);
  container.appendChild(content, content1, publicationChild, logoIcon, publicationItem, userPlusIcon,
  attachmentIcon, cameraPlusIcon, linkIcon, publicationInner, 
  lineIcon, saveIcon, buttonorangeContainer);

  return container;
}

export default createNewPost;
