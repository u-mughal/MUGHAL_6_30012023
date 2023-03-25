/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/**
Cette fonction génère une factory pour créer une lightbox.
Elle prend en paramètre un objet data contenant le titre et le média de la lightbox.
Elle renvoie un objet avec une méthode createItemlightbox pour créer un élément de lightbox.
@param {Object} data - Les données de la lightbox, contenant le titre et le média.
@param {string} data.title - Le titre de la lightbox.
@param {string} data.video - Le média de la lightbox, pouvant être une vidéo.
@returns {Object} - Un objet avec une méthode createItemlightbox pour créer un élément de lightbox.
*/

function lightboxFactory(data) {
  const {title, video} = data;

  function createItemlightbox(numItem) {
    const item = document.createElement('li');
    item.className = `lightbox-item item-${numItem}`;
    item.setAttribute('aria-hidden', numItem === 0 ? false : true);
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

    item.appendChild(generateMedialightbox());
    return item;
  }

  /**
  Cette fonction génère le contenu média de la lightbox.
  @function generateMedialightbox
  @returns {HTMLElement} - Un élément HTML contenant le contenu média et texte de la lightbox.
  */

  // eslint-disable-next-line require-jsdoc
  function generateMedialightbox() {
    const wrapper = document.createElement('div');
    wrapper.className = 'lightbox-content';

    const media = generateMedia(data);
    media.className = 'lightbox-media';
    if (video) media.setAttribute('controls', true);

    const textContent = document.createElement('div');
    textContent.className = 'text-content';
    const mediaText = document.createElement('p');
    mediaText.className = 'lightbox-title';
    mediaText.textContent = title;

    textContent.appendChild(mediaText);
    wrapper.append(media, textContent);
    return wrapper;
  }

  /**
  Cette méthode crée un élément de lightbox.
  @function createItemlightbox
  @param {number} numItem - Le numéro de l'élément de lightbox à créer.
  @returns {HTMLElement} - Un élément HTML représentant l'élément de lightbox créé.
  */

  return {createItemlightbox};
}
