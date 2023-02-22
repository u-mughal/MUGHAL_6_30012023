// Récupération des éléments HTML nécessaires
const mainPhotographer = document.getElementById("main-photographer");
const form = document.forms.contact;
const modal = document.getElementById("contact_modal");
const modalCloseBtn = document.querySelector(".close-modal");
const modalOpenBtn = document.querySelector("#btn_open_modal");
const allInput = [...document.querySelectorAll("input")];
allInput[3] = document.querySelector("#request");

// Fonction pour afficher la fenêtre modale
function displayModal() {
    mainPhotographer.setAttribute("aria-hidden", "true");
    mainPhotographer.classList.add("no-scroll");
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "block";
    form.elements.first.focus();
}

// Fonction pour fermer la fenêtre modale
function closeModal() {
    const modalOpenBtn = document.querySelector("#btn_open_modal");
    mainPhotographer.setAttribute("aria-hidden", "false");
    mainPhotographer.classList.remove("no-scroll");
    modal.setAttribute("aria-hidden", "true");
    modal.style.display = "none";
    modalOpenBtn.focus();
    hidethanks_field();
    form.reset();
}

