function portfolioFactory(data) {
  // Décomposition de l'objet 'data' pour une utilisation plus facile
  const { date, id, name, title, image, video, likes, liked } = data;

  /*----------------------- Function generatePortfolioCard -----------------------*/

  // Renommage de la fonction pour une meilleure compréhension
  // Définition de la fonction en dehors de l'objet retourné pour éviter la création de la fonction à chaque appel
  function generatePortfolioCard(index) {
    // Création de l'élément 'article'
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

    // Création de l'élément 'a' et ajout des attributs
    const link = document.createElement("a");
    link.href = "#";
    link.onclick = () => displaycarousel(index);
    link.tabIndex = 0;
    link.appendChild(generateMedia(data));

    // Création du texte d'accomplissement
    const achievementText = `
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

    // Ajout des éléments au 'article' avec la méthode 'insertAdjacentHTML'
    article.insertAdjacentHTML("beforeend", link.outerHTML + achievementText);

    return article;
  }

  // Retour de l'objet avec la fonction 'generatePortfolioCard'
  return {
    generatePortfolioCard,
  };
}