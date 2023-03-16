// Fonction pour récupérer l'ID passé en paramètre dans l'URL
const getParamId = () => {
    let params = new URL(document.location).searchParams;
    let id = parseInt(params.get("id"));
    return id;
};