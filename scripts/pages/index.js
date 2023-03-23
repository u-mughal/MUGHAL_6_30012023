/**
Cette fonction utilise la méthode fetch pour récupérer les données des photographes à partir d'un fichier JSON et les renvoie sous forme d'objet JSON.
@returns {Promise} une promesse résolue avec les données des photographes
*/

async function getPhotographers() {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    return data;
}

/**
Cette fonction affiche les données des photographes sur la page HTML en créant des éléments DOM pour chaque photographe et les ajoutant à la section "photographer_section" de la page.
@param {Array} photographers - un tableau contenant les données des photographes
*/

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.generatePhotographerCard();
        photographersSection.appendChild(userCardDOM);
    });
};

/**
Cette fonction initialise le processus d'affichage des données des photographes en appelant la fonction getPhotographers pour récupérer les données, puis en appelant la fonction displayData pour les afficher sur la page.
*/

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
};


init();