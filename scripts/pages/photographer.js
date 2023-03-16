// Cette fonction récupère les données du photographe et des médias à partir du fichier JSON
async function fetchData() {
    try {
        const response = await fetch('./data/photographers.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const photographerId = getParamId();
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



// Fonction "calculateTotalLikes" qui calcule le nombre total de "likes" pour toutes les photos d'un photographe.
function calculateTotalLikes(media) {
    const totalLikes = media.reduce((acc, { likes }) => acc + likes, 0);
    return { totalLikes };
}

// Fonction "addTotalLikesToPhotographer" qui ajoute le nombre total de "likes" à un photographe
function addTotalLikesToPhotographer(photographer, totalLikes) {
    return { ...photographer, ...totalLikes };
}

// Fonction pour ajouter le nombre total de "likes" sur le sticky
function addStickyTotalLikesToBody(photographer) {
    const wrapper = document.body;
    const factoryPhotographer = photographerFactory(photographer);

    // Supprime le sticky si elle existe.
    const sticky = document.querySelector(".sticky-price-tag");
    if (sticky) sticky.remove();
    wrapper.appendChild(factoryPhotographer.generateStickyForTotalLikes());
}

// Met à jour le nombre total de likes dans la section collante du photographe après un like.
async function addStickyTotalLikesToBodyAfterLike() {
    const photographer = await getDataPhotographer();
    const totalLikes = [...document.querySelectorAll(".gallery-section article[data-likes]")]
        .reduce((sum, card) => sum + parseInt(card.dataset.likes), 0);
    addStickyTotalLikesToBody({ ...photographer, totalLikes });
}

// Change l'état "like" d'une carte en cliquant sur l'icône de coeur.
async function toggleLike(idCard) {
    const article = document.getElementById(idCard);
    article.querySelector(".fa-heart").classList.toggle("fa-solid");
    await updateCardLikes(idCard, article.querySelector(".fa-heart").classList.contains("fa-regular"));
}

// Met à jour les données de likes d'une carte et appelle addStickyTotalLikesToBodyAfterLike() pour mettre à jour le total des likes.
async function updateCardLikes(idCard, add) {
    const card = document.getElementById(idCard);
    const { likes, liked, ...data } = card.dataset;
    const updatedData = { likes: parseInt(likes, 10) + (add ? 1 : -1), liked: add, ...data };
    UpdatePortfolioCard(updatedData, idCard);
    await addStickyTotalLikesToBodyAfterLike();
}

// Transforme les données des médias pour les associer au photographe et renvoie un tableau d'objets.
function transformData(data, photographerFirstName) {
    return data.map((gallery, index) => ({
        id: gallery.id, index,
        date: gallery.date,
        name: photographerFirstName,
        title: gallery.title,
        image: gallery.image,
        video: gallery.video,
        likes: gallery.likes,
        liked: gallery.liked,
    }));
}


async function init() {
    const [dataPhotographer, dataMedia] = await Promise.all([getDataPhotographer(), getMediaFromJson()]);
    const totalLikes = calculateTotalLikes(dataMedia);
    const mergeDataPhotographer = addTotalLikesToPhotographer(dataPhotographer, totalLikes);
    const mergeDataMedia = mergeMedia(dataPhotographer, dataMedia);

    DisplayPortfolioHeader(mergeDataPhotographer);
    setContactName(dataPhotographer);
    DisplayPortfolioCard(mergeDataMedia);
    addStickyTotalLikesToBody(mergeDataPhotographer);


}

function addListenerEventKey() {
    const gallerySection = document.querySelector(".gallery-section");
    const articleLinks = gallerySection.querySelectorAll("article a");
    const heartIcons = gallerySection.querySelectorAll("article .fa-heart");

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

    heartIcons.forEach((icon) => {
        icon.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.target.click();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    await init();
    addListenerEventKey();
});