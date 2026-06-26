import Form from "./class-form.js";
import Carrosel from "./class-carrosel.js";

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

window.reclameAqui = () => {
    document.querySelector("#formulario").scrollIntoView({
        behavior: 'smooth'
    });
}

window.menuMobile = () => {
    const menu = document.getElementById("menu");
    const menuMobileImg = document.getElementById("menu-mobile").querySelector("img");

    document.querySelector("body").classList.toggle("no-scroll");

    menu.classList.toggle("active");
    menuMobileImg.src = menu.classList.contains("active")
        ? "./assets/imgs/icons/close.png"
        : "./assets/imgs/icons/menu.png";

    menu.addEventListener("click", () => window.menuMobile());
}

document.addEventListener("DOMContentLoaded", () => {
    const form = new Form(document.querySelector("form"));
    const carrosel = new Carrosel(document.querySelector("#carrosel"));
});