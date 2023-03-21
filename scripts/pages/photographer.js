// Attendre que le DOM soit chargé avant d'exécuter le code
document.addEventListener("DOMContentLoaded", async () => {
    const [dataPhotographer, dataMedia] = await Promise.all([getDataPhotographer(), getMediaFromJson()]);
    const totalLikes = calculateTotalLikes(dataMedia);
    const mergeDataPhotographer = addTotalLikesToPhotographer(dataPhotographer, totalLikes);
    const mergeDataMedia = mergeMedia(dataPhotographer, dataMedia);

    DisplayPortfolioHeader(mergeDataPhotographer);
    setContactName(dataPhotographer);
    DisplayPortfolioCard(mergeDataMedia);
    addStickyTotalLikesToBody(mergeDataPhotographer);
    makelightbox(mergeDataMedia);
    initlightboxManager();

});

// Cette fonction récupère les données du photographe et des médias à partir du fichier JSON
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

// Cette fonction récupère uniquement les données du photographe en utilisant la fonction fetchData()
async function getDataPhotographer() {
    const { photographer } = await fetchData();
    return photographer;
}

// Cette fonction récupère uniquement les données des médias en utilisant la fonction fetchData()
async function getMediaFromJson() {
    const { media } = await fetchData();
    return media;
}

// Cette fonction affiche l'en-tête du photographe
function DisplayPortfolioHeader(photographer) {
    const wrapper = document.querySelector(".photograph-header");
    const factoryPhotographer = photographerFactory(photographer);
    const headerPhotographer = factoryPhotographer.generatePhotographerHeader();
    wrapper.appendChild(headerPhotographer);
}

// Cette fonction définit le nom du photographe pour le formulaire de contact
function setContactName(photographer) {
    const modal = document.getElementById("contact_modal");
    const name = photographer.name;
    const modalTitle = modal.querySelector(".modal header h2");
    modal.setAttribute("aria-describedby", `contactez ${name}`);
    modalTitle.setAttribute("id", `contactez ${name}`);
    modalTitle.innerHTML = `Contactez-moi<br/> ${name}`;
}

// Cette fonction fusionne les données du photographe et des médias
function mergeMedia(photographer, media) {
    const name = { name: photographer.name.split(" ")[0] };
    return media.map((element) => ({ ...name, ...element }));
}

// Cette fonction crée les cartes de portfolio pour chaque média
function generatePortfolioCards(media) {
    const portfolioCards = media.map((element, index) => {
        const factoryPortfolio = portfolioFactory(element);
        return factoryPortfolio.generatePortfolioCard(index);
    });
    return portfolioCards;
}

// Cette fonction affiche l'en-tête du photographe
function DisplayPortfolioCard(media) {
    const wrapper = document.querySelector(".gallery-section");
    media.forEach((element, index) => {
        const factoryPortfolio = portfolioFactory(element);
        const portfolioCard = factoryPortfolio.generatePortfolioCard(index);
        wrapper.appendChild(portfolioCard);
    });
}

// Cette fonction met à jour une carte de portfolio spécifique
function UpdatePortfolioCard(media, idCard) {
    const wrapper = document.getElementById(idCard);
    const index = wrapper.dataset.index;
    const factoryPortfolio = portfolioFactory(media);
    const portfolioCard = factoryPortfolio.generatePortfolioCard(index);
    wrapper.replaceWith(portfolioCard);
    addListenerEventKey();
}

// Cette fonction crée un élément lightbox pour un élément de média donné, en utilisant la factory function lightboxFactory
function createlightboxItem(element, index) {
    const factorylightbox = lightboxFactory(element);
    return factorylightbox.createItemlightbox(index);
}

// Cette fonction crée une liste d'éléments lightbox à partir d'un tableau de médias donné, en utilisant la fonction createlightboxItem() pour chaque élément de média
function makelightbox(media) {
    const wrapper = document.querySelector("#lightbox-list");
    const lightboxItems = media.map(createlightboxItem);
    lightboxItems.forEach(item => wrapper.appendChild(item));
}

// Cette fonction initialise le manager de lightbox en ajoutant dynamiquement un script au head du document
function initlightboxManager() {
    const script = document.createElement("script");
    script.src = "./scripts/utils/lightbox.js";
    document.head.appendChild(script);
}

// Cette fonction affiche la galerie triée
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

// Fonction qui ajoute des écouteurs d'événements "keydown" aux liens et icônes "heart" des cartes du portfolio.
function addListenerEventKey() {
    const gallerySection = document.querySelector(".gallery-section");
    const articleLinks = gallerySection.querySelectorAll("article a");
    const heartIcons = gallerySection.querySelectorAll("article .fa-heart");

    // Fonction qui gère les événements "keydown" sur les cartes du portfolio.
    const handleCardKeyDown = (event) => {
        const lightbox = document.querySelector(".lightbox-photographer");
        const lightboxIsClose = lightbox.getAttribute("aria-hidden");

        if (event.key === "Enter" && lightboxIsClose) {
            event.target.click();
        }
    };

    // Ajoute un écouteur d'événements "keydown" une fois sur chaque lien de carte du portfolio.
    articleLinks.forEach((link) => {
        link.addEventListener("keydown", handleCardKeyDown, { once: true });
    });

    // Ajoute un écouteur d'événements "keydown" sur chaque icône "heart" de carte du portfolio.
    heartIcons.forEach((icon) => {
        icon.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.target.click();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    // Appelle la fonction "addListenerEventKey" lors du chargement initial du DOM.
    addListenerEventKey();
});
