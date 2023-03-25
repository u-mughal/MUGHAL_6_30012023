/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/**
 * Fonction qui calcule le nombre total de "likes" pour toutes les photos d'un photographe.
 * @param {Array} media - Tableau d'objets représentant les photos du photographe.
 * @returns {Object} - Objet contenant le nombre total de "likes".
 */

function calculateTotalLikes(media) {
  const totalLikes = media.reduce((acc, {likes}) => acc + likes, 0);
  return {totalLikes};
}

/**
 * Fonction qui ajoute le nombre total de "likes" à un photographe.
 * @param {Object} photographer - Objet représentant un photographe.
 * @param {Object} totalLikes - Objet contenant le nombre total de "likes".
 * @returns {Object} - Nouvel objet photographe contenant le nombre total de "likes".
 */

function addTotalLikesToPhotographer(photographer, totalLikes) {
  return {...photographer, ...totalLikes};
}

/**
 * Fonction pour ajouter le nombre total de "likes" sur le sticky.
 * @param {Object} photographer - Objet représentant un photographe.
 */

function addStickyTotalLikesToBody(photographer) {
  const wrapper = document.body;
  const factoryPhotographer = photographerFactory(photographer);
  const sticky = document.querySelector('.sticky-price-tag');
  if (sticky) sticky.remove();
  wrapper.appendChild(factoryPhotographer.generateStickyForTotalLikes());
}

/**
 * Met à jour le nombre total de likes dans la section collante du photographe après un like.
 *
 * @async
 */

async function addStickyTotalLikesToBodyAfterLike() {
  const photographer = await getDataPhotographer();
  const totalLikes = [...document.querySelectorAll('.gallery-section article[data-likes]')]
      .reduce((sum, card) => sum + parseInt(card.dataset.likes), 0);
  addStickyTotalLikesToBody({...photographer, totalLikes});
}

/**
 * Change l'état "like" d'une carte en cliquant sur l'icône de coeur.
 * @param {string} idCard - ID de l'article de la carte.
 */

async function toggleLike(idCard) {
  const article = document.getElementById(idCard);
  article.querySelector('.fa-heart').classList.toggle('fa-solid');
  await updateCardLikes(idCard, article.querySelector('.fa-heart').classList.contains('fa-regular'));
}

/**
 * Met à jour les données de likes d'une carte et appelle la fonction addStickyTotalLikesToBodyAfterLike() pour mettre à jour le total des likes.
 *
 * @async
 * @param {string} idCard - L'ID de la carte à mettre à jour.
 * @param {boolean} add - Indique si un like doit être ajouté ou supprimé.
 */

async function updateCardLikes(idCard, add) {
  const card = document.getElementById(idCard);
  const {likes, liked, ...data} = card.dataset;
  const updatedData = {likes: parseInt(likes, 10) + (add ? 1 : -1), liked: add, ...data};
  // eslint-disable-next-line new-cap
  UpdatePortfolioCard(updatedData, idCard);
  await addStickyTotalLikesToBodyAfterLike();
}
