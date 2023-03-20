// Cette fonction ordonne les médias en fonction du critère sélectionné (likes, date, titre) et affiche la galerie triée
async function orderBy(data) {
    // Récupère les données des médias depuis le fichier JSON
    const dataMedia = await getMediaFromJson();
    // Trie les médias en fonction du critère sélectionné
    let NewSortedMedia = orderTraitement(dataMedia, data);
    // Affiche la galerie triée
    DisplayPortfolioCardBySort(NewSortedMedia);
};

// Cette fonction trie les médias en fonction du critère sélectionné et renvoie le tableau trié
function orderTraitement(dataMedia, data) {
    let sortedMedia = [];
    if (data === "likes") {
        sortedMedia = dataMedia.sort((a, b) => b.likes - a.likes);
    } else if (data === "date") {
        sortedMedia = dataMedia.sort((a, b) => new Date(b.date) > new Date(a.date) ? 1 : -1);
    } else if (data === "title") {
        sortedMedia = dataMedia.sort(compare_to_sort);
    } else {
        // Si aucun critère n'est sélectionné, retourne le tableau vide
        return sortedMedia;
    }
    // Retourne le tableau trié
    return sortedMedia;
}

// Cette fonction de comparaison est utilisée pour trier les médias par titre
function compare_to_sort(x, y) {
    if (x.title < y.title)
        return -1;
    if (x.title > y.title)
        return 1;
    return 0;
}