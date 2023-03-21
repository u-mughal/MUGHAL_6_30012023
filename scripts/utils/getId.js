// Définition de la fonction pour récupérer l'ID passé en paramètre dans l'URL
const getParamId = () => {
    // Récupération des paramètres de l'URL
    let params = new URL(document.location).searchParams;
    // Récupération de la valeur associée à la clé "id" et conversion en nombre entier
    let id = parseInt(params.get("id"));
    // Retour de l'ID récupéré
    return id;
};