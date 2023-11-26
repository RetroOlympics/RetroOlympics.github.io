const menu = document.querySelector('#menu-icon');
const navlist = document.querySelector('header nav');

menu.addEventListener("click", () => {
    navlist.classList.toggle('open');
});
