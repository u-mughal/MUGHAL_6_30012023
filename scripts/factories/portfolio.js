/**
 * Cette fonction génère une carte de portfolio à partir des données fournies
 *
 * @param {Object} data - Les données à utiliser pour générer la carte de portfolio
 * @returns {Object} - Un objet contenant la fonction 'generatePortfolioCard' pour créer une carte de portfolio
 */

function portfolioFactory(data) {

  const { date, id, name, title, image, video, likes, liked } = data;
  /**
   * Cette fonction génère une carte de portfolio pour une image ou une vidéo
   *
   * @param {number} index - L'index de la carte de portfolio dans la liste
   * @returns {HTMLElement} - L'élément HTML contenant la carte de portfolio générée à partir des données
   */
  function generatePortfolioCard(index) {
    const article = document.createElement("article");
    article.setAttribute("id", id);
    article.setAttribute("data-id", id);
    article.setAttribute("data-index", index);
    article.setAttribute("data-date", date);
    article.setAttribute("data-name", name);
    article.setAttribute("data-title", title);
    article.setAttribute("data-image", image);
    article.setAttribute("data-video", video);
    article.setAttribute("data-likes", likes);
    article.setAttribute("data-liked", liked);

    const link = document.createElement("a");
    link.href = "#";
    link.tabIndex = 0;
    link.setAttribute("onclick", `displaylightbox(${index})`);
    link.appendChild(generateMedia(data));

    const GalleryText = `
      <p>      
        ${title} 
        <span>
          ${likes} 
          <span 
            class="${liked && liked != "undefined"
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart"
      }" 
            title="likes"
            aria-hidden ="false"
            tabindex="0"
            title="add like" 
            onclick ="toggleLike(${id})"
          ></span>
          <span class="sr-only">add like for ${title}</span>
        </span>      
      </p>
    `;
    article.insertAdjacentHTML("beforeend", link.outerHTML + GalleryText);
    return article;
  }
  return {
    /**
    * Génère une carte de galerie à partir des données fournies.
    *
    * @param {number} index - L'indice de la carte dans la liste de galerie.
    * @returns {HTMLElement} L'élément HTML contenant les données et le texte de la galerie.
    */
    generatePortfolioCard,
  };
}