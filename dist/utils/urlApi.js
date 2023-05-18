var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const urlApi = "https://rickandmortyapi.com/api";
export const urlCharacters = `${urlApi}/character`;
export const urlLocations = `${urlApi}/location`;
export const urlEpisodes = `${urlApi}/episode`;
export const searchElements = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("eso ees");
    const containerMain = document.getElementById("containerMain");
    containerMain.replaceChildren();
    try {
        const charactersResponse = yield fetch(urlCharacters);
        const charactersData = yield charactersResponse.json();
        const locationsResponse = yield fetch(urlLocations);
        const locationsData = yield locationsResponse.json();
        const episodesResponse = yield fetch(urlEpisodes);
        const episodesData = yield episodesResponse.json();
        const baseUrlCharacter = 'https://rickandmortyapi.com/api/character';
        const allCharacters = [];
        for (let page = 1; page <= 42; page++) {
            const response = yield fetch(`${baseUrlCharacter}?page=${page}`);
            const data = yield response.json();
            const characters = data.results;
            allCharacters.push(...characters);
        }
        const baseUrlLocation = 'https://rickandmortyapi.com/api/location';
        const allLocations = [];
        for (let page = 1; page <= 7; page++) {
            const response = yield fetch(`${baseUrlLocation}?page=${page}`);
            const data = yield response.json();
            const locations = data.results;
            allLocations.push(...locations);
        }
        const baseUrlEpisode = 'https://rickandmortyapi.com/api/episode';
        const allEpisodes = [];
        for (let page = 1; page <= 3; page++) {
            const response = yield fetch(`${baseUrlEpisode}?page=${page}`);
            const data = yield response.json();
            const episodes = data.results;
            allEpisodes.push(...episodes);
        }
        const elementsToSearch = [...allCharacters, ...allLocations, ...allEpisodes];
        console.log(elementsToSearch);
        for (let i = 0; i < elementsToSearch.length; i++) {
            const element = elementsToSearch[i];
            const text = element.name.toLowerCase();
            if (text.includes(searchTerm.toLowerCase())) {
                if (element.status) {
                    const elementCard = document.createElement("div");
                    elementCard.setAttribute("class", "row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-5 p-2");
                    containerMain.appendChild(elementCard);
                    const characterCard = document.createElement("div");
                    characterCard.setAttribute("class", "col card mx-1 p-0 text-center");
                    elementCard.appendChild(characterCard);
                    const characterImage = document.createElement("img");
                    characterImage.setAttribute("src", element.image);
                    characterCard.appendChild(characterImage);
                    const pName = document.createElement("p");
                    pName.textContent = `Name: ${element.name}`;
                    characterCard.appendChild(pName);
                    const pStatus = document.createElement("p");
                    pStatus.textContent = `Status: ${element.status}`;
                    characterCard.appendChild(pStatus);
                    const pSpecies = document.createElement("p");
                    pSpecies.textContent = `Species: ${element.species}`;
                    characterCard.appendChild(pSpecies);
                }
                else if (element.episode) {
                    const elementCard = document.createElement("div");
                    elementCard.setAttribute("class", "container mx-auto");
                    containerMain === null || containerMain === void 0 ? void 0 : containerMain.appendChild(elementCard);
                    const h2Episode = document.createElement("h2");
                    h2Episode.textContent = `Title: ${element.name}`;
                    elementCard.appendChild(h2Episode);
                    const pEpisode = document.createElement("p");
                    pEpisode.textContent = `Episode: ${element.episode}`;
                    elementCard.appendChild(pEpisode);
                    const pAirDate = document.createElement("p");
                    pAirDate.textContent = `Air Date: ${element.air_date}`;
                    elementCard.appendChild(pAirDate);
                }
                else if (element.dimension) {
                    const elementCard = document.createElement("div");
                    elementCard.setAttribute("class", "container card mx-auto");
                    containerMain === null || containerMain === void 0 ? void 0 : containerMain.appendChild(elementCard);
                    const h2Location = document.createElement("h2");
                    h2Location.textContent = `Title: ${element.name}`;
                    elementCard.appendChild(h2Location);
                    const pType = document.createElement("p");
                    pType.textContent = `Type: ${element.type}`;
                    elementCard.appendChild(pType);
                    const pDimension = document.createElement("p");
                    pDimension.textContent = `Dimension: ${element.dimension}`;
                    elementCard.appendChild(pDimension);
                }
            }
        }
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
});
//# sourceMappingURL=urlApi.js.map