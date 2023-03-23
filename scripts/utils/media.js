/**
 * Cette fonction génère un élément média (image ou vidéo) en fonction des données d'entrée.
 *
 * @param {Object} data - L'objet contenant les informations de l'élément média.
 * @param {string} data.name - Le nom du dossier où se trouve l'élément média.
 * @param {string} data.image - Le nom de l'image à afficher (si l'élément est une image).
 * @param {string} data.video - Le nom de la vidéo à afficher (si l'élément est une vidéo).
 * @param {string} data.title - Le titre de l'élément média.
 * @returns {HTMLElement} - L'élément média (image ou vidéo) créé.
 */

function generateMedia(data) {
    const { name, image, video, title } = data;
    const mediaType = image && image !== "undefined" ? "img" : "video";
    const mediaElement = document.createElement(mediaType);
    mediaElement.setAttribute("src", `assets/images/${name}/${mediaType === "img" ? image : video}`);
    mediaElement.setAttribute("alt", `${mediaType === "img" ? name : "Vidéo"} s'intitulant ${title}`);
    mediaElement.classList.add(`gallery-${mediaType}`);
    return mediaElement;
}
