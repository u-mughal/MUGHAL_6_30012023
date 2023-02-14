// Initialisation de la page détail du photographe
async function init() {
    // Récupération des données du photographe en utilisant la fonction api avec le chemin vers le fichier JSON des photographes
    const data = api("./data/photographers.json");
    // Récupération du photographe en fonction de l'ID passé en paramètre dans l'URL
    const photographer = await data.getPhotographer(getParamId());
    // Récupération de l'élément HTML qui sera le container pour l'entête du photographe
    const header = document.querySelector(".photograph-header");
    // Utilisation de la factory function pour générer l'entête du photographe
    const factory = photographerFactory(photographer);
    // Ajout de l'entête du photographe dans le container HTML
    header.appendChild(factory.generatePhotographerHeader());
}

// Ajout d'un écouteur d'événement pour le contenu du DOM
document.addEventListener("DOMContentLoaded", async () => {
    // Attends l'exécution de la fonction init
    await init();
});