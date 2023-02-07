function photographerFactory(data) {
    const { id, portrait, name, city, country, tagline, price, totalLikes } = data;
    const picture = `./assets/photographers/${portrait}`;

    // Fonction pour créer la carte d'un photographe 
    function generatePhotographerCard() {
        const article = document.createElement('article');
        article.setAttribute("id", id);

        // Utilisation de la méthode searchParams pour définir le lien
        const params = new URL(document.location).searchParams;
        params.set("id", id);
        const href = `./photographer.html?${params}`;

        const link = document.createElement('a');
        link.setAttribute("href", href);

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", name);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);

        const cityCountry = document.createElement('span');
        cityCountry.textContent = `${city}, ${country}`;
        article.appendChild(cityCountry);

        const taglineStrong = document.createElement('strong');
        taglineStrong.textContent = tagline;
        article.appendChild(taglineStrong);

        const priceElement = document.createElement('p');
        priceElement.textContent = `${price}€/jour`;
        article.appendChild(priceElement);

        return article;
    }

    return { generatePhotographerCard };

}