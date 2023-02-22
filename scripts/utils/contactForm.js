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

// Cette fonction affiche le message de remerciement et masque le formulaire.
const showthanks_field = () => {
    document.querySelectorAll(".form-data").forEach(element => element.classList.add("disabled"));
    document.querySelector(".thanks-field").style.display = "block";
    document.querySelector("#btnSubmit").style.display = "none";
};

// Cette fonction masque le message de remerciement et réactive le formulaire.
const hidethanks_field = () => {
    document.querySelectorAll(".form-data").forEach(element => element.classList.remove("disabled"));
    document.querySelector(".thanks-field").style.display = "none";
    document.querySelector("#btnSubmit").style.display = "block";
};

// Cette fonction valide la soumission du formulaire.
const ValidationSubmit = event => {
    const validations = ["first", "last", "email", "request"];
    validations.forEach(validation => Validation(validation));
    if (ValidationFirstAndLast(validations[0]) &&
        ValidationFirstAndLast(validations[1]) &&
        ValidationEmail() &&
        ValidationRequest()) {
        const body = validations.map(validation => ({ [validation]: event.target.elements[validation].value }));
        showthanks_field();
        event.target.reset();
        console.log(body);
    }
    event.preventDefault();
};

// Cette fonction active ou désactive les messages d'erreur pour un champ de saisie.
const toggleErrorMessages = (element, etat) => {
    element.setAttribute("aria-invalid", etat);
    element.parentNode.dataset.visible = etat;
};

// Les champs prenom et nom doivent comporter un minimum de deux caractères et ne doivent pas etre vides.
const ValidationFirstAndLast = (inputId) => {
    const element = form.elements[inputId];
    const value = element.value.trim();

    if (value.length < 2) {
        console.log(`Le champ ${inputId} doit contenir au moins 2 caractères.`);
        element.parentNode.dataset.error = "doit contenir plus de 2 caractéres";
        toggleErrorMessages(element, true);
        return false;
    }

    const forbiddenChars = ["é", "è", "ê", "à", "â", "ù", "ô", "î", "ç"];
    const isForbiddenChar = forbiddenChars.some((char) => value.includes(char));

    if (isForbiddenChar) {
        console.log(`Le champ ${inputId} contient des caractères interdits.`);
        element.parentNode.dataset.error = `Votre ${inputId === "first" ? "prénom" : "nom"
            } doit être écrit sans accent.`;
        toggleErrorMessages(element, true);
        return false;
    }

    const hasConsecutiveSpaces = value.includes("  ");
    if (hasConsecutiveSpaces) {
        console.log(`Le champ ${inputId} contient des espaces consécutifs.`);
        element.parentNode.dataset.error = `Notre système est incapable de traiter les ${inputId === "first" ? "prénoms" : "noms"
            } qui commence par 2 fois espace.`;
        toggleErrorMessages(element, true);
        return false;
    }

    toggleErrorMessages(element, false);
    return true;
};

// Validation d'une adresse mail 
const ValidationEmail = () => {
    const email = form.elements.email;
    const atPos = email.value.indexOf("@");
    const dotPos = email.value.lastIndexOf(".");
    if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= email.value.length) {
        console.log("L'adresse e-mail est invalide");
        toggleErrorMessages(email, true);
        return false;
    } else {
        console.log("L'adresse e-mail est valide");
        toggleErrorMessages(email, false);
        return true;
    }
};

// Cette fonction permet de valider le champ de saisie
const ValidationRequest = () => {
    const request = form.elements.request;
    return request.value.length < 5
        ? (toggleErrorMessages(request, true), false)
        : (toggleErrorMessages(request, false), true);
};

// Fonction de validation en switch sur le champ de l'input
const Validation = (input) => {
    switch (input) {
        case "first":
        case "last":
            return ValidationFirstAndLast(input);
        case "email":
            return ValidationEmail();
        case "request":
            return ValidationRequest();
        default:
            console.log(`${input} n'existe pas`);
    }
};

// Attendre que le document soit chargé
document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", ValidationSubmit);

    // Ajouter des événements de blur et focus sur tous les inputs
    allInput.forEach((input) => {
        input.addEventListener("blur", () => Validation(input.id));
        input.addEventListener("focus", () => toggleErrorMessages(input, false));
    });

});
