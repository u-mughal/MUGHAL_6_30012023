// Cette fonction génère un élément de type "image" ou "vidéo" en fonction des données fournies.
function generateMedia(data) {
    const { name, image, video, title } = data;
    const mediaType = image && image !== "undefined" ? "img" : "video";
    const mediaElement = document.createElement(mediaType);
    mediaElement.setAttribute("src", `assets/images/${name}/${mediaType === "img" ? image : video}`);
    mediaElement.setAttribute("alt", `${mediaType === "img" ? name : "Vidéo"} s'intitulant ${title}`);
    mediaElement.classList.add(`gallery-${mediaType}`);
    return mediaElement;
}