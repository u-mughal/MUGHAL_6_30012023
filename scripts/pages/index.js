// Import des données des photographes en utilisant la méthode fetch
async function getPhotographers() {
    // Récupération des données en utilisant fetch
    const response = await fetch('./data/photographers.json');

    // Conversion des données en format JSON
    const data = await response.json();

    // Retour des données
    return data;
}

// Affichage des données sur la page HTML
async function displayData(photographers) {
    // Récupération de la section de la page HTML qui affichera les données des photographes
    const photographersSection = document.querySelector(".photographer_section");

    // Boucle sur les données des photographes pour les afficher sur la page
    photographers.forEach((photographer) => {
        // Utilisation de la fonction photographerFactory pour générer le modèle de chaque photographe
        const photographerModel = photographerFactory(photographer);

        // Récupération de la vue (DOM) générée par la fonction generatePhotographerCard
        const userCardDOM = photographerModel.generatePhotographerCard();

        // Ajout de la vue (DOM) générée à la section de la page HTML qui affichera les données des photographes
        photographersSection.appendChild(userCardDOM);
    });
};

// Initialisation de la fonction d'affichage des données
async function init() {
    // Récupération des données des photographes
    const { photographers } = await getPhotographers();

    // Affichage des données sur la page HTML
    displayData(photographers);
};

// Exécution de la fonction init pour démarrer le processus d'affichage des données
init();