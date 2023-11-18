const menu = document.querySelector('#menu-icon');
const navlist = document.querySelector('.navlist');

menu.addEventListener("click", () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('open');
});
