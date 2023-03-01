// Cette fonction est exécutée lorsque le contenu de la page est chargé et appelle les fonctions pour récupérer les données du photographe et les médias, fusionner les données et afficher le portfolio.
document.addEventListener("DOMContentLoaded", async (event) => {
    const dataPhotographer = await getDataPhotographer();
    const dataMedia = await getMedia();
    const mergeDataPhotographer = clonePhotographer(dataPhotographer);
    const mergeDataMedia = mergeMedia(dataPhotographer, dataMedia);


    setContactName(dataPhotographer);
    displayPortfolioHeader(mergeDataPhotographer);
    displayPortfolioCards(mergeDataMedia);
});

// Cette fonction utilise l'API pour récupérer les données du photographe en fonction de l'ID présent dans l'URL et renvoie un objet photographe.
async function getDataPhotographer() {
    const data = api("./data/photographers.json");
    const photographer = await data.getPhotographer(getParamId());
    return photographer;
}

// Cette fonction utilise l'API pour récupérer les médias du photographe en fonction de l'ID présent dans l'URL et renvoie un tableau de médias.
async function getMedia() {
    const data = api("./data/photographers.json");
    const media = await data.getMedia(getParamId());
    return media;
}

// Cette fonction modifie le nom du titre de la modale pour inclure le nom du photographe.
function setContactName(photographer) {
    const modal = document.getElementById("contact_modal");
    modal.setAttribute("aria-describedby", `contactez ${photographer.name}`);
    const modalTitle = document.querySelector(".modal header h2");
    modalTitle.setAttribute("id", `contactez ${photographer.name}`);
    modalTitle.innerHTML = `Contactez-moi<br/> ${photographer.name}`;
}

// Cette fonction affiche le header du photographe à partir de l'objet photographe.
function displayPortfolioHeader(photographer) {
    const wrapper = document.querySelector(".photograph-header");
    const factoryPhotographer = photographerFactory(photographer);
    const headerPhotographer = factoryPhotographer.generatePhotographerHeader();
    wrapper.appendChild(headerPhotographer);
}

// Cette fonction fusionne le nom du photographe avec chaque média pour créer un tableau de médias fusionnés.
function mergeMedia(photographer, media) {
    const name = { name: photographer.name.split(" ")[0] };
    let mediaMerge = [];
    media.forEach((element) => {
        mediaMerge.push({ ...name, ...element });
    });
    return mediaMerge;
}

// Cette fonction renvoie une copie de l'objet photographe pour éviter de modifier l'objet original.
function clonePhotographer(photographer) {
    return { ...photographer };
}

// Cette fonction affiche les cartes de portfolio à partir du tableau de médias fusionnés.
function displayPortfolioCards(media) {
    const wrapper = document.querySelector(".achievements_section");
    media.forEach((element, index) => {
        const factoryPortfolio = portfolioFactory(element);
        const portfolioCard = factoryPortfolio.generatePortfolioCard(index);
        wrapper.appendChild(portfolioCard);
    });
}
