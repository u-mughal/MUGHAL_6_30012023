// Récupération des boutons de navigation et des éléments de la lightbox
const prevBtn = document.querySelectorAll(".prev-image");
const nextBtn = document.querySelectorAll(".next-image");
const lightboxItems = document.querySelectorAll(".lightbox-item");
const closeBtn = document.querySelector(".lightbox-photographer");
const sectionWrapper = document.querySelector(".gallery-section");

// Définition de la position actuelle de l'élément dans la lightbox et de l'intervalle de la lightbox
let currentItemPosition = 0;
let lightboxInterval;

// Fonction pour afficher la lightbox
function displaylightbox(index) {
    toggleFocusCard();
    sectionWrapper.setAttribute("aria-hidden", true);
    const lightbox = document.querySelector(".lightbox-photographer");
    // Mise à jour de la position actuelle
    currentItemPosition = index;
    let lastItem = null;
    // Détermination de l'élément précédent à afficher
    if (currentItemPosition === 0) {
        lastItem = `.item-${lightboxItems.length - 1}`;
    } else {
        lastItem = `.item-${currentItemPosition - 1}`;
    }
    const currentItem = `.item-${currentItemPosition}`;
    // Affichage de l'élément sélectionné
    setNodeAttributes(lastItem, currentItem);
    lightbox.style.display = "block";
    lightbox.setAttribute("aria-hidden", false);
}

// Fonction pour fermer la lightbox
const closelightbox = () => {
    // Restauration de la navigation au clavier sur les éléments de la galerie
    toggleFocusCard((add = true));
    addListenerEventKey();
    const lightbox = document.querySelector(".lightbox-photographer");
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", true);
    sectionWrapper.setAttribute("aria-hidden", false);
    currentItemPosition = 0;
    // Masquage de tous les éléments de la lightbox
    document.querySelectorAll(".lightbox-item").forEach((item) => {
        item.style.display = "none";
    });
    // Arrêt de l'intervalle de la lightbox
    clearInterval(lightboxInterval);
};

// Fonctions pour naviguer dans la lightbox
const goToNextSlide = () => {
    if (currentItemPosition + 1 >= lightboxItems.length) {
        // Si on atteint la fin de la lightbox, affichage du premier élément
        const lastItem = `.item-${currentItemPosition}`;

        currentItemPosition = 0;
        const currentItem = `.item-${currentItemPosition}`;

        setNodeAttributes(lastItem, currentItem);
    } else {
        // Sinon, affichage de l'élément suivant
        currentItemPosition += 1;
        const lastItem = `.item-${currentItemPosition - 1}`;
        const currentItem = `.item-${currentItemPosition}`;
        setNodeAttributes(lastItem, currentItem);
    }
};

// Fonction pour passer à l'élément précédent dans la lightbox
const goToPreviousSlide = () => {
    if (currentItemPosition - 1 >= 0) {
        // Si on n'est pas sur le premier élément, affichage de l'élément précédent
        currentItemPosition -= 1;
        const currentItem = `.item-${currentItemPosition}`;
        const lastItem = `.item-${currentItemPosition + 1}`;

        setNodeAttributes(lastItem, currentItem);
    } else {
        // Sinon, affichage du dernier élément
        const lastItem = `.item-${currentItemPosition}`;

        currentItemPosition = lightboxItems.length - 1;
        const currentItem = `.item-${currentItemPosition}`;
        setNodeAttributes(lastItem, currentItem);
    }
};

// Cette fonction permet de définir les attributs de deux éléments HTML en fonction de leur visibilité dans la page
const setNodeAttributes = (lastItem, currentItem) => {
    lastItem = document.querySelector(lastItem);
    currentItem = document.querySelector(currentItem);
    lastItem.style.display = "none";
    currentItem.style.display = "block";
    lastItem.setAttribute("aria-hidden", "true");
    currentItem.setAttribute("aria-hidden", "false");
};

// Cette fonction permet de créer des événements sur des boutons pour naviguer dans une galerie d'images
const createEventListenerModal = () => {
    const prevBtn = document.querySelectorAll(".prev-image");
    const nextBtn = document.querySelectorAll(".next-image");
    prevBtn.forEach((element) => {
        element.addEventListener("click", goToPreviousSlide);
    }),
        nextBtn.forEach((element) => {
            element.addEventListener("click", goToNextSlide);
        }),
        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowRight") {
                goToNextSlide();
            } else if (event.key === "ArrowLeft") {
                goToPreviousSlide();
            }
        });
};

// Cette fonction permet de mettre en surbrillance les éléments de la galerie d'images lorsqu'ils sont sélectionnés
const toggleFocusCard = (add) => {
    const article = document.querySelectorAll(".gallery-section article a");
    const heartLike = document.querySelectorAll(
        ".gallery-section article .fa-heart"
    );
    article.forEach((card) => {
        card.setAttribute("tabindex", add ? "0" : "-1");
    });
    heartLike.forEach((heart) => {
        heart.setAttribute("tabindex", add ? "0" : "-1");
    });
    add && article[currentItemPosition].focus();
};

// Cette partie de code ajoute des événements sur des boutons et une touche du clavier pour naviguer dans une galerie d'images
prevBtn.forEach((element) => {
    element.addEventListener("click", goToPreviousSlide);
}),
    nextBtn.forEach((element) => {
        element.addEventListener("click", goToNextSlide);
    }),
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowRight") {
            goToNextSlide();
        } else if (event.key === "ArrowLeft") {
            goToPreviousSlide();
        } else if (event.key === "Escape") {
            closelightbox();
        }
    });
