function photographerFactory(data) {
  // Décomposition des propriétés de l'objet data
  const { id, portrait, name, city, country, tagline, price, totalLikes } = data;

  // Fonction pour créer la carte d'un photographe 
  function generatePhotographerCard() {
    // Création de l'élément HTML article
    const article = document.createElement('article');

    // Attribution de l'ID à l'article
    article.setAttribute("id", id);

    // Insertion du HTML à l'intérieur de l'article
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

    // Retour de l'élément article
    return article;
  }

  // Retour de l'objet avec la fonction generatePhotographerCard
  return { generatePhotographerCard };
}