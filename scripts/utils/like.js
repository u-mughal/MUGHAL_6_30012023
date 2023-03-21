// Fonction "calculateTotalLikes" qui calcule le nombre total de "likes" pour toutes les photos d'un photographe.
function calculateTotalLikes(media) {
    const totalLikes = media.reduce((acc, { likes }) => acc + likes, 0);
    return { totalLikes };
}

// Fonction "addTotalLikesToPhotographer" qui ajoute le nombre total de "likes" à un photographe
function addTotalLikesToPhotographer(photographer, totalLikes) {
    return { ...photographer, ...totalLikes };
}

// Fonction pour ajouter le nombre total de "likes" sur le sticky
function addStickyTotalLikesToBody(photographer) {
    const wrapper = document.body;
    const factoryPhotographer = photographerFactory(photographer);

    // Supprime le sticky si elle existe.
    const sticky = document.querySelector(".sticky-price-tag");
    if (sticky) sticky.remove();
    wrapper.appendChild(factoryPhotographer.generateStickyForTotalLikes());
}

// Met à jour le nombre total de likes dans la section collante du photographe après un like.
async function addStickyTotalLikesToBodyAfterLike() {
    const photographer = await getDataPhotographer();
    const totalLikes = [...document.querySelectorAll(".gallery-section article[data-likes]")]
        .reduce((sum, card) => sum + parseInt(card.dataset.likes), 0);
    addStickyTotalLikesToBody({ ...photographer, totalLikes });
}

// Change l'état "like" d'une carte en cliquant sur l'icône de coeur.
async function toggleLike(idCard) {
    const article = document.getElementById(idCard);
    article.querySelector(".fa-heart").classList.toggle("fa-solid");
    await updateCardLikes(idCard, article.querySelector(".fa-heart").classList.contains("fa-regular"));
}

// Met à jour les données de likes d'une carte et appelle addStickyTotalLikesToBodyAfterLike() pour mettre à jour le total des likes.
async function updateCardLikes(idCard, add) {
    const card = document.getElementById(idCard);
    const { likes, liked, ...data } = card.dataset;
    const updatedData = { likes: parseInt(likes, 10) + (add ? 1 : -1), liked: add, ...data };
    UpdatePortfolioCard(updatedData, idCard);
    await addStickyTotalLikesToBodyAfterLike();
}
