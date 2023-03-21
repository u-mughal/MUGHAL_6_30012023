// Sélectionner les éléments HTML nécessaires pour le fonctionnement du composant de sélection personnalisé
const selectWrapper = document.querySelector(".wrapper_select");
const selectButton = document.querySelector(".select_button");
const buttonValues = document.querySelector(".pseudo_value");
const listbox = document.querySelector('.select_list [role="listbox"]');
const options = document.querySelectorAll('.select_list [role="listbox"] [role="option"]');

// Initialiser la variable pour suivre l'ID de l'élément option sélectionné
let nextId = 0;

// Fonction pour afficher ou masquer la liste déroulante de sélection
const toggleSelect = (open) => {
    listbox.style.display = open ? "block" : "none";
    selectButton.setAttribute("aria-expanded", open);
};

// Fonction pour ajouter le style à l'élément option sélectionné
const addStyleOptionSelected = (target) => {
    target.classList.add("option-selected");
    options.forEach((option) => {
        if (option !== target) option.classList.remove("option-selected");
    });
    buttonValues.innerText = target.innerText;
};

// Fonction pour définir la mise au point sur un élément option spécifique et ajouter le style à cet élément
const focusOption = (option, direction) => {
    option.focus();
    addStyleOptionSelected(option);
    nextId = options.indexOf(option) + direction;
};

// Fonction pour sélectionner une option de la liste
const selectOption = (option) => {
    addStyleOptionSelected(option);
    toggleSelect(false);
    selectButton.focus();
};

// Gérer les événements déclenchés par un clic sur le bouton de sélection ou appui sur la touche "Enter"
const handleButtonClick = (event) => {
    if (event.type === "click" || event.key === "Enter") {
        toggleSelect(true);
        options[nextId].focus();
        addStyleOptionSelected(options[nextId]);
        event.preventDefault();
    } else if (event.key === "Escape") {
        toggleSelect(false);
        selectButton.focus();
    } else if (event.key === "ArrowDown") {
        focusOption(options[nextId], 1);
        event.preventDefault();
    } else if (event.key === "ArrowUp") {
        focusOption(options[nextId], -1);
        event.preventDefault();
    }
};

// Gérer les événements déclenchés par un clic sur une option de la liste
const handleOptionClick = (event) => {
    selectOption(event.target);
};

// Gérer les événements de la touche enfoncée pour une option de la liste
const handleOptionKeydown = (event) => {
    switch (event.key) {
        case "Enter":
            selectOption(event.target);
            break;
        case "Escape":
            toggleSelect(false);
            selectButton.focus();
            break;
        case "ArrowDown":
            focusOption(event.target.nextElementSibling, 1);
            event.preventDefault();
            break;
        case "ArrowUp":
            focusOption(event.target.previousElementSibling, -1);
            event.preventDefault();
            break;
    }
};

// Cette fonction est appelée lorsque le focus quitte le select
const handleFocusout = (event) => {
    // Si l'élément focusé n'est pas une option, on ferme le select
    if (event.relatedTarget === null || !event.relatedTarget.classList.contains("option")) {
        toggleSelect(false);
    }
    event.preventDefault();
};

// On ajoute des écouteurs d'événement au bouton select
selectButton.addEventListener("click", handleButtonClick);
selectButton.addEventListener("keydown", handleButtonClick);
selectButton.addEventListener("mouseover", (event) => {
    addStyleOptionSelected(event.target);
});

// On ajoute des écouteurs d'événement à chaque option du select
options.forEach((option) => {
    option.addEventListener("click", handleOptionClick);
    option.addEventListener("keydown", handleOptionKeydown);
});

// On ajoute un écouteur d'événement sur le select pour gérer la perte de focus
selectWrapper.addEventListener("focusout", handleFocusout);
