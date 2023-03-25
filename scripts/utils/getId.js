/* eslint-disable no-unused-vars */
/**
Fonction pour récupérer l'ID passé en paramètre dans l'URL.
@returns {number} L'ID passé en paramètre dans l'URL.
*/

const getParamId = () => {
  const params = new URL(document.location).searchParams;
  const id = parseInt(params.get('id'));
  return id;
};
