// Factory function pour créer une lightbox
function lightboxFactory(data) {
  const { title, video } = data;

  // Fonction pour créer un élément de lightbox
  function createItemlightbox(numItem) {
    const item = document.createElement("li");
    item.className = `lightbox-item item-${numItem}`;
    item.setAttribute("aria-hidden", numItem === 0 ? false : true);
    item.innerHTML = `
      <div role="button" class="controls controls-left">
        <span class="img prev-image">
          <i aria-hidden="true" class="fa-solid fa-chevron-left"></i>
        </span>
        <p class="sr-only">Previous</p>
      </div>
      <div role="button" class="controls controls-right">
        <span class="img next-image">
          <i aria-hidden="true" class="fa-solid fa-chevron-right"></i>
        </span>
        <p class="sr-only">Next</p>
      </div>`;

    // Ajouter le contenu média généré dynamiquement
    item.appendChild(generateMedialightbox());
    return item;
  }

  // Fonction pour générer le contenu média de la lightbox
  function generateMedialightbox() {
    const wrapper = document.createElement("div");
    wrapper.className = "lightbox-content";

    // Générer le contenu média approprié
    const media = generateMedia(data);
    media.className = "lightbox-media";
    if (video) media.setAttribute("controls", true);

    // Générer le contenu texte
    const textContent = document.createElement("div");
    textContent.className = "text-content";
    const mediaText = document.createElement("p");
    mediaText.className = "lightbox-title";
    mediaText.textContent = title;

    textContent.appendChild(mediaText);
    wrapper.append(media, textContent);
    return wrapper;
  }

  return { createItemlightbox };
}