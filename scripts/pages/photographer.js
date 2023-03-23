/**
 * Cette fonction est exécutée lorsque le DOM est chargé et permet d'initialiser la page.
 * @async
 */

document.addEventListener("DOMContentLoaded", async () => {

    /**
     * On récupère les données du photographe et des médias.
     * @type {Array<Object>} - Un tableau contenant les données du photographe et des médias.
     */

    const [dataPhotographer, dataMedia] = await Promise.all([getDataPhotographer(), getMediaFromJson()]);

    /**
     * On calcule le nombre total de likes de tous les médias.
     * @type {number} - Le nombre total de likes.
     */

    const totalLikes = calculateTotalLikes(dataMedia);

    /**
     * On ajoute le nombre total de likes au profil du photographe.
     * @type {Object} - Les données du photographe incluant le nombre total de likes.
     */

    const mergeDataPhotographer = addTotalLikesToPhotographer(dataPhotographer, totalLikes);

    /**
     * On fusionne les données du photographe et des médias.
     * @type {Array<Object>} - Un tableau contenant les données fusionnées du photographe et des médias.
     */

    const mergeDataMedia = mergeMedia(dataPhotographer, dataMedia);

    DisplayPortfolioHeader(mergeDataPhotographer);
    setContactName(dataPhotographer);
    DisplayPortfolioCard(mergeDataMedia);
    addStickyTotalLikesToBody(mergeDataPhotographer);
    makelightbox(mergeDataMedia);
    initlightboxManager();

});

/**

Fonction asynchrone qui effectue une requête fetch sur le fichier JSON des photographes,
puis vérifie si la réponse est ok et si les données des photographes sont bien un tableau.
Ensuite, elle vérifie si l'ID du photographe dans l'URL est bien un nombre et récupère
les données du photographe et des médias correspondant à cet ID. En cas d'erreur, elle
retourne un objet avec un photographe null et un tableau vide de médias.
@returns {Object} - L'objet contenant les données du photographe et les médias.
*/

async function fetchData() {
    try {
        const response = await fetch('./data/photographers.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!Array.isArray(data.photographers)) {
            throw new Error('Photographers data is not an array');
        }
        const photographerId = getParamId();
        if (isNaN(photographerId)) {
            throw new Error('Photographer id is not a number');
        }
        const photographer = data.photographers.find(p => p.id == photographerId);
        if (!photographer) {
            throw new Error(`Photographer with id ${photographerId} not found`);
        }
        const media = data.media.filter(m => m.photographerId == photographerId);
        return { photographer, media };
    } catch (error) {
        console.error('Error getting data:', error);
        return { photographer: null, media: [] };
    }
}

/**
Fonction asynchrone qui utilise la fonction fetchData() pour récupérer uniquement les données du photographe.
@returns {Object} - L'objet contenant les données du photographe.
*/

async function getDataPhotographer() {
    const { photographer } = await fetchData();
    return photographer;
}

/**
Fonction asynchrone qui utilise la fonction fetchData() pour récupérer uniquement les données des médias.
@returns {Array} - Le tableau contenant les données des médias.
*/

async function getMediaFromJson() {
    const { media } = await fetchData();
    return media;
}

/**
 * Affiche l'en-tête du portfolio du photographe.
 *
 * @param {object} photographer - Le photographe dont l'en-tête doit être affiché.
 */

function DisplayPortfolioHeader(photographer) {
    const wrapper = document.querySelector(".photograph-header");
    const factoryPhotographer = photographerFactory(photographer);
    const headerPhotographer = factoryPhotographer.generatePhotographerHeader();
    wrapper.appendChild(headerPhotographer);
}

/**
 * Définit le nom du photographe pour le formulaire de contact.
 *
 * @param {object} photographer - Le photographe dont le nom sera utilisé.
 */

function setContactName(photographer) {
    const modal = document.getElementById("contact_modal");
    const name = photographer.name;
    const modalTitle = modal.querySelector(".modal header h2");
    modal.setAttribute("aria-describedby", `contactez ${name}`);
    modalTitle.setAttribute("id", `contactez ${name}`);
    modalTitle.innerHTML = `Contactez-moi<br/> ${name}`;
}

/**
 * Fusionne les données du photographe et des médias.
 *
 * @param {object} photographer - Le photographe.
 * @param {array} media - Les médias à fusionner avec les données du photographe.
 * @returns {array} - Un tableau contenant les médias fusionnés avec les données du photographe.
 */

function mergeMedia(photographer, media) {
    const name = { name: photographer.name.split(" ")[0] };
    return media.map((element) => ({ ...name, ...element }));
}

/**
 * Crée les cartes de portfolio pour chaque média.
 *
 * @param {array} media - Les médias pour lesquels des cartes de portfolio doivent être créées.
 * @returns {array} - Un tableau contenant les cartes de portfolio pour chaque média.
 */

function generatePortfolioCards(media) {
    const portfolioCards = media.map((element, index) => {
        const factoryPortfolio = portfolioFactory(element);
        return factoryPortfolio.generatePortfolioCard(index);
    });
    return portfolioCards;
}

/**
 * Affiche la carte de portfolio pour chaque élément de média
 *
 * @param {Object[]} media - Un tableau d'objets de données médias
 */

function DisplayPortfolioCard(media) {
    const wrapper = document.querySelector(".gallery-section");
    media.forEach((element, index) => {
        const factoryPortfolio = portfolioFactory(element);
        const portfolioCard = factoryPortfolio.generatePortfolioCard(index);
        wrapper.appendChild(portfolioCard);
    });
}

/**
 * Met à jour une carte de portfolio spécifique
 *
 * @param {Object} media - Un objet de données média
 * @param {string} idCard - L'ID de la carte de portfolio à mettre à jour
 */

function UpdatePortfolioCard(media, idCard) {
    const wrapper = document.getElementById(idCard);
    const index = wrapper.dataset.index;
    const factoryPortfolio = portfolioFactory(media);
    const portfolioCard = factoryPortfolio.generatePortfolioCard(index);
    wrapper.replaceWith(portfolioCard);
    addListenerEventKey();
}

/**
 * Crée un élément lightbox pour un élément de média donné, en utilisant la factory function lightboxFactory
 *
 * @param {Object} element - Un objet de données média
 * @param {number} index - L'index de l'élément dans le tableau des médias
 * @returns {HTMLElement} - L'élément HTML de la lightbox
 */

function createlightboxItem(element, index) {
    const factorylightbox = lightboxFactory(element);
    return factorylightbox.createItemlightbox(index);
}

/**
* Crée une liste d'éléments lightbox à partir d'un tableau de médias donné, en utilisant la fonction createlightboxItem() pour chaque élément de média
* @param {Array} media - Un tableau de médias
*/

function makelightbox(media) {
    const wrapper = document.querySelector("#lightbox-list");
    const lightboxItems = media.map(createlightboxItem);
    lightboxItems.forEach(item => wrapper.appendChild(item));
}

/**
Initialise la lightbox en ajoutant dynamiquement un script au head du document
*/

function initlightboxManager() {
    const script = document.createElement("script");
    script.src = "./scripts/utils/lightbox.js";
    document.head.appendChild(script);
}

/**
* Affiche la galerie triée
* @param {Array} data - Un tableau de données
*/

async function DisplayPortfolioCardBySort(data) {
    const gallerySection = document.querySelector(".gallery-section");
    gallerySection.innerHTML = "";
    const lightboxlist = document.querySelector("#lightbox-list");
    lightboxlist.innerHTML = "";

    const { photographer } = await fetchData();
    const namePhotographer = photographer.name.split(" ");
    const newData = data.map((achievement, index) => ({
        ...achievement,
        index,
        name: namePhotographer[0],
    }));

    DisplayPortfolioCard(newData);
    makelightbox(newData);
    createEventListenerModal();
}


/**
 * Ajoute des écouteurs d'événements clavier aux éléments de la page pour faciliter l'interaction avec la galerie.
 */

function addListenerEventKey() {
    const gallerySection = document.querySelector(".gallery-section");
    const articleLinks = gallerySection.querySelectorAll("article a");
    const heartIcons = gallerySection.querySelectorAll("article .fa-heart");

    /**
     * Cette fonction gère les événements "keydown" sur les liens des cartes du portfolio.
     * Si la touche "Entrée" est appuyée et que la lightbox est fermée, déclenche un clic sur le lien pour ouvrir la lightbox.
     * @param {Event} event - L'événement à gérer.
     */

    const handleCardKeyDown = (event) => {
        const lightbox = document.querySelector(".lightbox-photographer");
        const lightboxIsClose = lightbox.getAttribute("aria-hidden");

        if (event.key === "Enter" && lightboxIsClose) {
            event.target.click();
        }
    };
    articleLinks.forEach((link) => {
        link.addEventListener("keydown", handleCardKeyDown, { once: true });
    });

    /**
     * Cette fonction gère les événements "keydown" sur les icônes "heart" des cartes du portfolio.
     * Si la touche "Entrée" est appuyée, déclenche un clic sur l'icône pour ajouter ou supprimer des favoris.
     * @param {Event} event - L'événement à gérer.
     */

    heartIcons.forEach((icon) => {
        icon.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.target.click();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    addListenerEventKey();
});
