/**
Le wrapper contenant le select.
* @type {HTMLElement}
Le bouton pour ouvrir/fermer le select.
* @type {HTMLButtonElement}
La zone d'affichage des valeurs sélectionnées.
* @type {HTMLElement}
La liste déroulante des options.
* @type {HTMLElement}
La liste des options sélectionnables.
* @type {NodeListOf<HTMLElement>}
*/

const selectWrapper = document.querySelector(".wrapper_select");
const selectButton = document.querySelector(".select_button");
const buttonValues = document.querySelector(".pseudo_value");
const listbox = document.querySelector('.select_list [role="listbox"]');
const options = document.querySelectorAll('.select_list [role="listbox"] [role="option"]');


/**
* Indique si le select est ouvert ou non.
* @type {boolean}
*/

let selectOpen = false;

/**
* Gère l'événement click sur le bouton pour ouvrir/fermer le select.
* @param {MouseEvent} event - L'événement click.
*/

selectButton.addEventListener("click", (event) => {
    toggleVisibiliteSelect(event);
    focusNextListOption();
});

/**
* Gère l'événement keydown sur le bouton pour ouvrir/fermer le select.
* @param {KeyboardEvent} event - L'événement keydown.
*/

selectButton.addEventListener("keydown", (event) => {
    toggleVisibiliteSelect(event);
});

/**
* Gère l'événement mouseover sur le bouton pour afficher le style de l'option sélectionnée.
* @param {MouseEvent} event - L'événement mouseover.
*/

selectButton.addEventListener("mouseover", (event) => {
    addStyleOptionSelected(event.target);
});

/**
* Ajoute les écouteurs d'événements sur chaque option.
* @param {HTMLElement} option - L'option à écouter.
*/

options.forEach((option) => {
    option.addEventListener("click", (event) => {
        addStyleOptionSelected(event.target);
        selectOpen = false;
        toggleSelect(selectOpen);
    });

    option.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "Enter":
                event.target.click();
                return;

            case "Escape":
                selectOpen = false;
                toggleSelect(selectOpen);
                return;

            case "ArrowDown":
                event.preventDefault();
                focusNextListOption("down");
                return;

            case "ArrowUp":
                event.preventDefault();
                focusNextListOption("up");
                return;

            default:
                return;
        }
    });
});

/**
 * Ajoute un écouteur d'événements de focusout pour fermer le select si le focus est perdu.
 * @param {Event} event - L'événement de focusout.
 */

selectWrapper.addEventListener("focusout", (event) => {
    if (
        event.relatedTarget === null ||
        event.relatedTarget.classList[0] != "option"
    ) {
        selectOpen = false;
        toggleSelect(selectOpen);
    }
    event.preventDefault();
});


/**
 * @function toggleVisibiliteSelect - Fonction pour basculer la visibilité de la liste de sélection en fonction de l'événement fourni.
 * @param {KeyboardEvent|MouseEvent} event - L'événement déclencheur de la fonction.
 */

const toggleVisibiliteSelect = (event) => {
    if (event.key === "Enter" || event.type === "click") {
        selectOpen = true;
        toggleSelect(selectOpen);
        event.preventDefault();
    } else if (event.key === "Escape") {
        selectOpen = false;
        toggleSelect(selectOpen);
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        focusNextListOption("down");
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        focusNextListOption("up");
    }
};


/**
 * @function toggleSelect -Fonction pour activer ou désactiver l'affichage de la liste de sélection.
 * @param {boolean} open - Indique si la liste de sélection doit être affichée (true) ou cachée (false).
 */

const toggleSelect = (open) => {
    if (open) {
        listbox.style.display = "block";
        selectButton.setAttribute("aria-expanded", true);
    } else {
        listbox.style.display = "none";
        selectButton.setAttribute("aria-expanded", false);
    }
};


/**
 * @global nextId - Identifiant de l'élément suivant qui sera focus dans la liste.
 * @type {number}
 */

let nextId = 0;

/**
 * @function focusNextListOption - Focus sur l'élément suivant dans la liste déroulante.
 * @param {string} direction - La direction dans laquelle l'utilisateur se déplace dans la liste.
 * @returns {void}
 */

const focusNextListOption = (direction) => {
    const activeElementId = document.activeElement.id;

    if (activeElementId === "select_button") {
        options[nextId].focus();
        addStyleOptionSelected(options[nextId]);
    } else {
        const currentElementId = parseInt(document.activeElement.id.split("-")[1]);
        nextId = direction === "down" ? currentElementId + 1 : currentElementId - 1;
        if (options.length != "" && nextId >= 0 && nextId <= options.length - 1) {
            options[nextId].focus();
            addStyleOptionSelected(options[nextId]);
        } else {
            return;
        }
    }
};


/**
 * @function removeSelected - Supprime la classe "option-selected" des options qui ne sont pas sélectionnées.
 * @param {string} value - La valeur de l'option sélectionnée.
 * @returns {void}
 */

const removeSelected = (value) => {
    options.forEach((option) => {
        if (option.innerText != value) option.classList.remove("option-selected");
    });
};


/**
 * @function addStyleOptionSelected - Ajoute la classe "option-selected" à l'option sélectionnée et met à jour la valeur du bouton.
 * @param {Element} target - L'élément option sélectionné.
 * @returns {void}
 */

const addStyleOptionSelected = (target) => {
    target.classList.add("option-selected");
    removeSelected(target.innerText);
    buttonValues.innerText = target.innerText;
};