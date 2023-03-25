/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/**
 * Trie les médias selon le critère spécifié (likes, date, titre) et affiche la galerie triée.
 * @async
 * @param {string} data - Le critère de tri sélectionné.
 * @returns {Promise<void>}
 */

async function orderBy(data) {
  const dataMedia = await getMediaFromJson();
  const NewSortedMedia = orderTraitement(dataMedia, data);
  DisplayPortfolioCardBySort(NewSortedMedia);
};

/**
 * Trie les médias selon le critère spécifié et renvoie le tableau trié.
 * @param {Array} dataMedia - Le tableau des médias à trier.
 * @param {string} data - Le critère de tri sélectionné.
 * @returns {Array} Le tableau trié.
 */

function orderTraitement(dataMedia, data) {
  let sortedMedia = [];
  if (data === 'likes') {
    sortedMedia = dataMedia.sort((a, b) => b.likes - a.likes);
  } else if (data === 'date') {
    sortedMedia = dataMedia.sort((a, b) => new Date(b.date) > new Date(a.date) ? 1 : -1);
  } else if (data === 'title') {
    sortedMedia = dataMedia.sort(compare_to_sort);
  } else {
    return sortedMedia;
  }
  return sortedMedia;
}

/**
Compare deux objets en fonction de leur propriété "title".
Cette fonction est utilisée pour trier un tableau d'objets par ordre alphabétique de titres.
@param {Object} x - Le premier objet à comparer.
@param {Object} y - Le deuxième objet à comparer.
@returns {number} - Un entier négatif si x.title est inférieur à y.title, un entier positif si x.title est supérieur à y.title, et 0 si les deux titres sont égaux.
*/

// eslint-disable-next-line camelcase
function compare_to_sort(x, y) {
  if (x.title < y.title) {
    return -1;
  }
  if (x.title > y.title) {
    return 1;
  }
  return 0;
}
