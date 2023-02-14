// Fonction pour récupérer l'ID passé en paramètre dans l'URL
const getParamId = () => {
    // Création d'un objet URL à partir de l'emplacement actuel du document
    let params = new URL(document.location).searchParams;
    // Récupération de la valeur du paramètre "id" dans l'URL
    let id = parseInt(params.get("id"));
    // Retour de la valeur convertie en entier de "id"
    return id;
};