function portfolioFactory(data) {
  // Décomposition de l'objet 'data' pour une utilisation plus facile
  const { date, id, name, title, image, video, likes, liked } = data;

  // Définition de la fonction en dehors de l'objet retourné pour éviter la création de la fonction à chaque appel
  function generatePortfolioCard(index) {
    // Création de l'élément 'article' avec les attributs nécessaires
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

    // Création d'un lien pour contenir le média généré à partir des données
    const link = document.createElement("a");
    link.href = "#";
    link.tabIndex = 0;
    link.setAttribute("onclick", `displaycarousel(${index})`);
    link.appendChild(generateMedia(data));

    // Génération du texte de la galerie en utilisant les données fournies et une icône de coeur qui peut être cliquée pour ajouter ou supprimer une indication de like
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

    // Ajout du lien et du texte de la galerie à l'article
    article.insertAdjacentHTML("beforeend", link.outerHTML + GalleryText);

    // Retourne l'article avec les données et le texte de la galerie
    return article;
  }

  // Retourne un objet à partir des données fournies
  return {
    generatePortfolioCard,
  };
}