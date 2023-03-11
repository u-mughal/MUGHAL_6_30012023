// Cette fonction récupère les données du photographe et des médias à partir du fichier JSON
async function fetchData() {
    const data = api("./data/photographers.json");
    const [photographer, media] = await Promise.all([
        data.getPhotographer(getParamId()),
        data.getMedia(getParamId()),
    ]);
    return { photographer, media };
}

// Cette fonction récupère uniquement les données du photographe en utilisant fetch()
async function getDataPhotographer() {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    const photographer = data.photographers.find(p => p.id == getParamId());
    return photographer;
}

// Cette fonction récupère uniquement les données des médias en utilisant fetch()
async function getMedia() {
    try {
        const response = await fetch('./data/photographers.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const photographerId = getParamId();
        const media = data.media.filter(m => m.photographerId == photographerId);
        return media;
    } catch (error) {
        console.error('Error getting media:', error);
        return [];
    }
}

// Cette fonction affiche l'en-tête du photographe
function DisplayPortfolioHeader(photographer) {
    const wrapper = document.querySelector(".photograph-header");
    const { generatePhotographerHeader } = photographerFactory(photographer);
    const headerPhotographer = generatePhotographerHeader();
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

// Cette fonction affiche les cartes de portfolio
function DisplayPortfolioCard(media) {
    const wrapper = document.querySelector(".gallery-section");
    const portfolioCards = generatePortfolioCards(media);
    wrapper.append(...portfolioCards);
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

function makecarousel(media) {
    const wrapper = document.querySelector("#carousel-list");
    media.forEach((element, index) => {
        const factorycarousel = carouselFactory(element);
        const item = factorycarousel.createItemcarousel(index);
        wrapper.appendChild(item);
    });
}

function initcarouselManager() {
    let script = document.createElement("script");
    script.src = "./scripts/utils/carousel.js";
    document.head.appendChild(script);
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

// Initialise la page en récupérant les données du photographe et des médias, puis en affichant les informations sur la page.
async function init() {
    const [dataPhotographer, dataMedia] = await Promise.all([getDataPhotographer(), getMedia()]);
    const totalLikes = calculateTotalLikes(dataMedia);
    DisplayPortfolioHeader(addTotalLikesToPhotographer(dataPhotographer, totalLikes));
    setContactName(dataPhotographer);
    DisplayPortfolioCard(mergeMedia(dataPhotographer, dataMedia));
    addStickyTotalLikesToBody(addTotalLikesToPhotographer(dataPhotographer, totalLikes));

}

// Ajoute un écouteur d'événements pour capturer les entrées clavier et simuler un clic sur l'icône de coeur.
function addListenerEventKey() {
    document.querySelector(".gallery-section").addEventListener("keydown", (event) => {
        if (event.key === "Enter" && event.target.classList.contains("fa-heart")) event.target.click();
    });
}

// Initialise la page et ajoute un écouteur d'événements pour capturer les entrées clavier.
async function initPage() {
    await init();
    addListenerEventKey();
}

// Attend le chargement complet de la page avant d'initialiser la page et d'ajouter l'écouteur d'événements.
document.addEventListener("DOMContentLoaded", initPage);
