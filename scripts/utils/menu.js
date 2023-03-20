const selectWrapper = document.querySelector(".wrapper_select");
const selectButton = document.querySelector(".select_button");
const buttonValues = document.querySelector(".pseudo_value");
const listbox = document.querySelector('.select_list [role="listbox"]');
const options = document.querySelectorAll('.select_list [role="listbox"] [role="option"]');

let nextId = 0;

const toggleSelect = (open) => {
    listbox.style.display = open ? "block" : "none";
    selectButton.setAttribute("aria-expanded", open);
};

const addStyleOptionSelected = (target) => {
    target.classList.add("option-selected");
    options.forEach((option) => {
        if (option !== target) option.classList.remove("option-selected");
    });
    buttonValues.innerText = target.innerText;
};

const focusOption = (option, direction) => {
    option.focus();
    addStyleOptionSelected(option);
    nextId = options.indexOf(option) + direction;
};

const selectOption = (option) => {
    addStyleOptionSelected(option);
    toggleSelect(false);
    selectButton.focus();
};

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

const handleOptionClick = (event) => {
    selectOption(event.target);
};

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

const handleFocusout = (event) => {
    if (event.relatedTarget === null || !event.relatedTarget.classList.contains("option")) {
        toggleSelect(false);
    }
    event.preventDefault();
};

selectButton.addEventListener("click", handleButtonClick);
selectButton.addEventListener("keydown", handleButtonClick);
selectButton.addEventListener("mouseover", (event) => {
    addStyleOptionSelected(event.target);
});

options.forEach((option) => {
    option.addEventListener("click", handleOptionClick);
    option.addEventListener("keydown", handleOptionKeydown);
});

selectWrapper.addEventListener("focusout", handleFocusout);

// 
