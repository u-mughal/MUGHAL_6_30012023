// Function "api" qui prend en paramètre une URL
function api(url) {
    // Fonction asynchrone "get" qui récupère les données d'un type spécifié et éventuellement d'un ID spécifié
    async function get(type, id) {
        // Utilisation de la méthode Fetch pour récupérer les données à partir de l'URL spécifiée
        return fetch(url)
            .then(res => res.json()) // Conversion des données en format JSON
            .then(res => {
                // Si un ID est spécifié
                if (id) {
                    // Retourne l'objet correspondant à l'ID ou les objets correspondant à l'ID du photographe
                    return res[type].find(item => item.id === parseInt(id)) ||
                        res[type].filter(item => item.photographerId === parseInt(id));
                }
                // Sinon, retourne tous les objets du type spécifié
                return res[type];
            })
            .catch(err => console.log("An error occurs:", err)); // Gestion des erreurs
    }

    // Fonction asynchrone "getMediaById" qui filtre les données d'un type spécifié par ID
    async function getMediaById(type, id) {
        // Utilisation de la méthode Fetch pour récupérer les données à partir de l'URL spécifiée
        return fetch(url)
            .then(res => res.json()) // Conversion des données en format JSON
            .then(res => res[type].filter(item => item.photographerId === parseInt(id))) // Filtrage des données
            .catch(err => console.log("An error occurs:", err)); // Gestion des erreurs
    }

    // Déclaration d'un objet qui sera retourné à la fin de la fonction api
    return {
        // Propriété getPhotographers qui retourne un appel à la fonction get avec le paramètre "photographers"
        getPhotographers: () => get("photographers"),
        // Propriété getPhotographer qui retourne un appel à la fonction get avec les paramètres "photographers" et id
        getPhotographer: (id) => get("photographers", id),
        // Propriété getMedia qui retourne un appel à la fonction getMediaById avec les paramètres "media" et id
        getMedia: (id) => getMediaById("media", id),
    };
}