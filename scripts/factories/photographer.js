/**
 * Factory pour générer des objets photographe avec leurs données
 * @param {object} data - Les données d'un photographe
 * @returns {object} - Un objet avec des fonctions pour générer du HTML avec les données du photographe
 */

function photographerFactory(data) {
  // Décomposition des propriétés de l'objet data
  const { id, portrait, name, city, country, tagline, price, totalLikes } = data;

  /**
  * Fonction pour créer la carte d'un photographe 
  * @returns {HTMLElement} - Un élément HTML représentant la carte d'un photographe avec les données associées
  */

  function generatePhotographerCard() {
    const article = document.createElement('article');
    article.setAttribute("id", id);
    article.insertAdjacentHTML(
      "beforeend",
      `
      <a href="./photographer.html?id=${id}">
          <img
              alt="${name}"
              src="./assets/photographers/${portrait}"
          />
          <h2>${name}</h2>
      </a>
      <span>${city}, ${country}</span><br />
      <strong>${tagline}</strong><br />
      ${price}€/jour
      `
    );
    return article;
  }

  /**
   * Fonction pour créer l'en-tête du profil photographe
   * @returns {HTMLElement} - Un élément HTML représentant l'en-tête du profil photographe avec les données associées
   */

  function generatePhotographerHeader() {
    const wrapper = document.createElement("article");
    wrapper.classList.add("wrapper");
    wrapper.insertAdjacentHTML(
      "beforeend",
      `
            <div class="text">
              <h1>${name}</h1>
              <p>
                <span>
                  ${city}, ${country}
                </span>
                <br />
                ${tagline}
              </p>
            </div>
            <button class="contact_button" onclick="displayModal()" id="btn_open_modal">
              Contactez-moi
            </button>
            <img src="./assets/photographers/${portrait}" 
              alt=""
            />
        `
    );
    return wrapper;
  }

  /**
   * Fonction qui génère le contenu HTML pour le compteur de likes
   * @returns {HTMLElement} - Un élément HTML représentant le compteur de likes avec les données associées
   */

  function generateStickyForTotalLikes() {
    const wrapper = document.createElement("aside");
    wrapper.classList.add("sticky-price-tag");
    const stickyTotalLikes = `
        <p>
          <span>
            <span class="total-likes">
              ${totalLikes.toString()}
            </span> 
            <i class="fa-solid fa-heart" aria-hidden="true"></i> 
          </span>
          ${price}€ / jour
        </p>
      `;
    wrapper.innerHTML = stickyTotalLikes;
    return wrapper;
  }
  // Retour de l'objet avec la fonction generatePhotographerCard, generatePhotographerHeader et generateStickyForTotalLikes
  return {
    generatePhotographerCard,
    generatePhotographerHeader,
    generateStickyForTotalLikes,
  };
};
