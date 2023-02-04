// Importations des données en utilisant la méthode Fetch.
async function getPhotographers() {
    const response = await fetch('./data/photographers.json');
    const data = await response.json();
    console.log(data);
    return data;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.generatePhotographerCard();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();