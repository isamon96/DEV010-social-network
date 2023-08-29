// archivo home.js sera el el elemento que se visualiza en nuestra aplicación cuando entremos la primera vez
function home(navigateTo) {
    const section = document.createElement('section');
    const title = document.createElement('h2');
    const button = document.createElement('button');

    button.textContent = 'login';
    title.textContent = 'Bienvenid@s a Re+';

    section.appendChild(title);
    section.appendChild(button); // Append the button separately
    return section;
}

export default home;
