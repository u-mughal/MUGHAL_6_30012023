// Import des données des photographes en utilisant la méthode fetch
async function getPhotographers() {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    return data;
}

// Affichage des données sur la page HTML
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.generatePhotographerCard();
        photographersSection.appendChild(userCardDOM);
    });
};

// Initialisation de la fonction d'affichage des données
async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

// Exécution de la fonction init pour démarrer le processus d'affichage des données
init();