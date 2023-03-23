/**
Récupère tous les boutons "précédent" de la lightbox.
@type {NodeList}
Récupère tous les boutons "suivant" de la lightbox.
@type {NodeList}
Récupère tous les éléments de la lightbox.
@type {NodeList}
Récupère le bouton pour fermer la lightbox.
@type {Element}
Récupère l'élément conteneur de la galerie.
@type {Element}
*/

const prevBtn = document.querySelectorAll(".prev-image");
const nextBtn = document.querySelectorAll(".next-image");
const lightboxItems = document.querySelectorAll(".lightbox-item");
const closeBtn = document.querySelector(".lightbox-photographer");
const sectionWrapper = document.querySelector(".gallery-section");

/**
Stocke la position actuelle de l'élément dans la lightbox.
@type {number}
Stocke l'ID de l'intervalle pour l'animation de la lightbox.
@type {number}
*/

let currentItemPosition = 0;
let lightboxInterval;

/**
 * Affiche la lightbox à partir de l'élément sélectionné.
 *
 * @param {number} index - L'indice de l'élément sélectionné.
 * @return {void}
 */

function displaylightbox(index) {
    toggleFocusCard();
    sectionWrapper.setAttribute("aria-hidden", true);
    const lightbox = document.querySelector(".lightbox-photographer");
    currentItemPosition = index;
    let lastItem = null;
    if (currentItemPosition === 0) {
        lastItem = `.item-${lightboxItems.length - 1}`;
    } else {
        lastItem = `.item-${currentItemPosition - 1}`;
    }
    const currentItem = `.item-${currentItemPosition}`;
    setNodeAttributes(lastItem, currentItem);
    lightbox.style.display = "block";
    lightbox.setAttribute("aria-hidden", false);
}

/**
*Fonction qui ferme la lightbox et restaure la navigation au clavier sur les éléments de la galerie.
*/

const closelightbox = () => {
    toggleFocusCard((add = true));
    addListenerEventKey();
    const lightbox = document.querySelector(".lightbox-photographer");
    lightbox.style.display = "none";
    lightbox.setAttribute("aria-hidden", true);
    sectionWrapper.setAttribute("aria-hidden", false);
    currentItemPosition = 0;
    document.querySelectorAll(".lightbox-item").forEach((item) => {
        item.style.display = "none";
    });
    clearInterval(lightboxInterval);
};

/**
Permet de passer à l'élément suivant de la lightbox.
*/

const goToNextSlide = () => {
    if (currentItemPosition + 1 >= lightboxItems.length) {
        const lastItem = `.item-${currentItemPosition}`;
        currentItemPosition = 0;
        const currentItem = `.item-${currentItemPosition}`;
        setNodeAttributes(lastItem, currentItem);
    } else {
        currentItemPosition += 1;
        const lastItem = `.item-${currentItemPosition - 1}`;
        const currentItem = `.item-${currentItemPosition}`;
        setNodeAttributes(lastItem, currentItem);
    }
};

/**
Cette fonction permet de naviguer vers l'élément précédent de la galerie d'images
*/

const goToPreviousSlide = () => {
    if (currentItemPosition - 1 >= 0) {
        currentItemPosition -= 1;
        const currentItem = `.item-${currentItemPosition}`;
        const lastItem = `.item-${currentItemPosition + 1}`;
        setNodeAttributes(lastItem, currentItem);
    } else {
        const lastItem = `.item-${currentItemPosition}`;

        currentItemPosition = lightboxItems.length - 1;
        const currentItem = `.item-${currentItemPosition}`;
        setNodeAttributes(lastItem, currentItem);
    }
};

/**
Cette fonction permet de définir les attributs de deux éléments HTML en fonction de leur visibilité dans la page
@param {string} lastItem - Le sélecteur CSS de l'élément précédent
@param {string} currentItem - Le sélecteur CSS de l'élément actuel
*/

const setNodeAttributes = (lastItem, currentItem) => {
    lastItem = document.querySelector(lastItem);
    currentItem = document.querySelector(currentItem);
    lastItem.style.display = "none";
    currentItem.style.display = "block";
    lastItem.setAttribute("aria-hidden", "true");
    currentItem.setAttribute("aria-hidden", "false");
};

/**
Cette fonction crée des événements sur des boutons pour naviguer dans une galerie d'images
*/

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

/**
Cette fonction permet de basculer l'accessibilité clavier des cartes et des icônes de cœur dans une galerie de cartes.
@param {boolean} add - Si vrai, active l'accessibilité clavier. Si faux, désactive l'accessibilité clavier.
*/

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
