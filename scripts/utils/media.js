// Cette fonction génère un élément média en fonction des données d'entrée
function generateMedia(data) {
    // Extraire les données passées en paramètre
    const { name, image, video, title } = data;
    // Vérifier si l'élément est une image ou une vidéo en fonction des paramètres passés
    const mediaType = image && image !== "undefined" ? "img" : "video";
    // Créer un élément media HTML (image ou vidéo) en fonction du type déterminé
    const mediaElement = document.createElement(mediaType);
    // Définir l'attribut source de l'élément média en fonction du type et du nom/passation de l'image ou vidéo
    mediaElement.setAttribute("src", `assets/images/${name}/${mediaType === "img" ? image : video}`);
    // Définir l'attribut alt de l'élément média en fonction du type et du nom de l'image ou de la vidéo
    mediaElement.setAttribute("alt", `${mediaType === "img" ? name : "Vidéo"} s'intitulant ${title}`);
    // Ajouter une classe CSS en fonction du type de média ("gallery-img" pour les images et "gallery-video" pour les vidéos)
    mediaElement.classList.add(`gallery-${mediaType}`);
    // Retourner l'élément média créé
    return mediaElement;
}
