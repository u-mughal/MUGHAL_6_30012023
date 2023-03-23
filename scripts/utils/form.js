/**
Élément DOM représentant le photographe principal.
@type {Element}
Objet représentant le formulaire de contact.
@type {HTMLFormElement}
Élément DOM représentant la fenêtre modale de contact.
@type {Element}
Bouton de fermeture de la fenêtre modale de contact.
@type {Element}
Bouton d'ouverture de la fenêtre modale de contact.
@type {Element}
Tableau contenant tous les champs de saisie du formulaire de contact.
@type {Array<Element>}
Élément DOM représentant le champ de saisie de demande spécifique.
Remplace la quatrième entrée de allInput.
@type {Element}
*/

const mainPhotographer = document.getElementById("main-photographer");
const form = document.forms.contact;
const modal = document.getElementById("contact_modal");
const modalCloseBtn = document.querySelector(".close-modal");
const modalOpenBtn = document.querySelector("#btn_open_modal");
const allInput = [...document.querySelectorAll("input")];
allInput[3] = document.querySelector("#request");

/**
Affiche la fenêtre modale de contact et désactive le défilement de la page.
*/

function displayModal() {
    mainPhotographer.setAttribute("aria-hidden", "true");
    mainPhotographer.classList.add("no-scroll");
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "block";
    form.elements.first.focus();
}

/**
Ferme la fenêtre modale de contact et réactive le défilement de la page.
Réinitialise le formulaire et supprime le message de remerciement le cas échéant.
*/

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

/**
Affiche le champ de remerciement et désactive tous les champs du formulaire.
Masque également le bouton de soumission.
*/

const showthanks_field = () => {
    document.querySelectorAll(".form-data").forEach(element => element.classList.add("disabled"));
    document.querySelector(".thanks-field").style.display = "block";
    document.querySelector("#btnSubmit").style.display = "none";
};


/**
Masque le champ de remerciement et réactive tous les champs du formulaire.
Affiche également le bouton de soumission.
*/

const hidethanks_field = () => {
    document.querySelectorAll(".form-data").forEach(element => element.classList.remove("disabled"));
    document.querySelector(".thanks-field").style.display = "none";
    document.querySelector("#btnSubmit").style.display = "block";
};

/**
Vérifie les champs du formulaire avant de soumettre le formulaire et affiche les messages d'erreur appropriés le cas échéant.
@param {Object} event - L'événement de soumission du formulaire.
*/

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

/**
Active ou désactive les messages d'erreur pour un champ de saisie en fonction d'un état booléen.
@param {HTMLElement} element - L'élément de saisie pour lequel les messages d'erreur doivent être activés ou désactivés.
@param {boolean} etat - L'état d'activation/désactivation des messages d'erreur. True pour activer, false pour désactiver.
*/

const toggleErrorMessages = (element, etat) => {
    element.setAttribute("aria-invalid", etat);
    element.parentNode.dataset.visible = etat;
};

/**
 * Vérifie si le champ de saisie du prénom ou du nom est valide.
 *
 * @param {string} inputId - L'identifiant de l'élément de saisie.
 * @returns {boolean} - true si la saisie est valide, false sinon.
 */

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

/**
Cette fonction permet de valider l'adresse e-mail saisie dans le formulaire.
Elle vérifie si l'adresse e-mail est valide en cherchant la position de "@" et "." dans l'adresse e-mail.
@returns {boolean} Retourne true si l'adresse e-mail est valide, sinon retourne false.
*/

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

/**
Cette fonction permet de valider le champ de saisie 'request' dans le formulaire.
Elle vérifie si la longueur de la valeur de la requête est inférieure à 5 caractères.
@returns {boolean} Retourne true si la longueur de la valeur de la requête est supérieure ou égale à 5, sinon retourne false.
*/

const ValidationRequest = () => {
    const request = form.elements.request;
    return request.value.length < 5
        ? (toggleErrorMessages(request, true), false)
        : (toggleErrorMessages(request, false), true);
};

/**
Cette fonction de validation permet de rediriger les éléments du formulaire vers les fonctions de validation correspondantes en fonction de leur identifiant.
@param {string} input - L'identifiant de l'élément à valider.
*/

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

/**
Cette fonction attend que le document soit chargé et ajoute les événements de validation sur les éléments du formulaire.
Elle ajoute également un événement pour la touche Entrée et un événement pour la touche Échap afin de valider le formulaire et de fermer le modal, respectivement.
*/

document.addEventListener("DOMContentLoaded", () => {
    form.addEventListener("submit", ValidationSubmit);
    allInput.forEach((input) => {
        input.addEventListener("blur", () => Validation(input.id));
        input.addEventListener("focus", () => toggleErrorMessages(input, false));
    });
    document.addEventListener("keydown", (event) => {
        const isModalOpen = modal.attributes["aria-hidden"].value === "false";
        if (isModalOpen && event.key === "Enter") ValidationSubmit(event);
        if (isModalOpen && event.key === "Escape") closeModal();
    });
});
