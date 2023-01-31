//Création d'un objet photographe avec les propeétés extraites à partir des données fournies.
function photographerFactory(data) {
    const { id, portrait, name, city, country, tagline, price, totalLikes } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.setAttribute("class", "photographer-card");

        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", `Portrait de ${name}`);

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const cityElement = document.createElement('p');
        cityElement.textContent = `Ville : ${city}`;

        const countryElement = document.createElement('p');
        countryElement.textContent = `Pays : ${country}`;

        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;

        const priceElement = document.createElement('p');
        priceElement.textContent = `Prix : ${price}`;

        const totalLikesElement = document.createElement('p');
        totalLikesElement.textContent = `Nombre de likes : ${totalLikes}`;

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(cityElement);
        article.appendChild(countryElement);
        article.appendChild(taglineElement);
        article.appendChild(priceElement);
        article.appendChild(totalLikesElement);

        return article;
    }

    return { name, picture, city, country, tagline, price, totalLikes, getUserCardDOM };
}

