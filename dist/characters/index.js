var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { urlCharacters } from "../utils/urlApi.js";
export const getCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characterBtn = document.getElementById("charactersBtn");
        const characters = yield fetchCharacters();
        const totalPages = calculateTotalPages(characters.length);
        characterBtn.addEventListener("click", () => showCharacters(characters, totalPages, 1));
    }
    catch (error) {
        console.error("Error getting characters", error);
    }
});
const fetchCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    let allCharacters = [];
    let nextPageUrl = urlCharacters;
    while (nextPageUrl) {
        const res = yield fetch(nextPageUrl);
        const data = yield res.json();
        const characters = data.results.map((characterData) => {
            return {
                id: characterData.id,
                name: characterData.name,
                episode: characterData.episode,
                gender: characterData.gender,
                status: characterData.status,
                species: characterData.species,
                image: characterData.image,
                location: characterData.location.name,
                origin: characterData.origin.name,
            };
        });
        allCharacters = allCharacters.concat(characters);
        nextPageUrl = data.info.next;
    }
    return allCharacters;
});
const createPagination = (totalPages, page, characters) => {
    const containerMain = document.getElementById("containerMain");
    const paginationContainer = document.createElement("div");
    paginationContainer.setAttribute("id", "paginationContainer");
    paginationContainer.setAttribute("class", "d-flex justify-content-center");
    if (!paginationContainer)
        return;
    paginationContainer.innerHTML = "";
    containerMain.appendChild(paginationContainer);
    const paginationList = document.createElement("ul");
    paginationList.classList.add("pagination");
    paginationContainer.appendChild(paginationList);
    const prevPageItem = document.createElement("li");
    prevPageItem.classList.add("page-item");
    const prevPageLink = document.createElement("button");
    prevPageLink.setAttribute("id", "prevPageBtn");
    prevPageLink.classList.add("page-link");
    prevPageLink.textContent = "Previous";
    prevPageItem.appendChild(prevPageLink);
    paginationList.appendChild(prevPageItem);
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);
    for (let i = startPage; i <= endPage; i++) {
        const pageItem = document.createElement("li");
        pageItem.classList.add("page-item");
        const pageLink = document.createElement("button");
        pageLink.classList.add("page-link");
        pageLink.setAttribute("id", `page${i}`);
        pageLink.textContent = i.toString();
        pageItem.appendChild(pageLink);
        paginationList.appendChild(pageItem);
        pageLink.addEventListener("click", () => {
            showCharacters(characters, totalPages, i);
        });
        if (i === page) {
            pageItem.classList.add("active");
        }
    }
    const nextPageItem = document.createElement("li");
    nextPageItem.classList.add("page-item");
    const nextPageLink = document.createElement("button");
    nextPageLink.setAttribute("id", "nextPageBtn");
    nextPageLink.classList.add("page-link");
    nextPageLink.textContent = "Next";
    nextPageItem.appendChild(nextPageLink);
    paginationList.appendChild(nextPageItem);
    nextPageLink.addEventListener("click", () => {
        if (page < totalPages) {
            showCharacters(characters, totalPages, page + 1);
        }
    });
    prevPageLink.addEventListener("click", () => {
        if (page > 1) {
            showCharacters(characters, totalPages, page - 1);
        }
    });
};
const calculateTotalPages = (totalCharacters) => {
    const charactersPerPage = 20;
    return Math.ceil(totalCharacters / charactersPerPage);
};
function showCharacters(characters, totalPages, page) {
    const containerMain = document.getElementById("containerMain");
    if (!containerMain)
        return;
    containerMain.innerHTML = "";
    const charactersPerPage = 20;
    const startIndex = (page - 1) * charactersPerPage;
    const endIndex = startIndex + charactersPerPage;
    const charactersToDisplay = characters.slice(startIndex, endIndex);
    const titleCharactersDiv = document.createElement("h2");
    titleCharactersDiv.setAttribute("class", "text-center my-3 p-0 ");
    titleCharactersDiv.textContent = "Characters";
    containerMain.appendChild(titleCharactersDiv);
    const divContainerCharacters = document.createElement("div");
    divContainerCharacters.setAttribute("class", "row row-cols-1 row-cols-sm-4 row-cols-md-5 justify-content-center g-3 ");
    containerMain.appendChild(divContainerCharacters);
    charactersToDisplay.forEach((character) => {
        const characterDiv = document.createElement("div");
        characterDiv.setAttribute("class", "col card mx-1 p-0 text-center card-transform shadow");
        characterDiv.setAttribute("id", `character${character.id}`);
        divContainerCharacters.appendChild(characterDiv);
        const characterImage = document.createElement("img");
        characterImage.setAttribute("src", character.image);
        characterDiv.appendChild(characterImage);
        const pName = document.createElement("p");
        pName.textContent = `Name: ${character.name}`;
        characterDiv.appendChild(pName);
        const pStatus = document.createElement("p");
        pStatus.textContent = `Status: ${character.status}`;
        characterDiv.appendChild(pStatus);
        const pSpecies = document.createElement("p");
        pSpecies.textContent = `Species: ${character.species}`;
        characterDiv.appendChild(pSpecies);
        const pGender = document.createElement("p");
        pGender.textContent = `Gender: ${character.gender}`;
        characterDiv.appendChild(pGender);
        const pOrigin = document.createElement("p");
        pOrigin.textContent = `Origin: ${character.origin}`;
        characterDiv.appendChild(pOrigin);
        const pLocation = document.createElement("p");
        pLocation.textContent = `Location: ${character.location}`;
        characterDiv.appendChild(pLocation);
        characterDiv.addEventListener("click", () => showCharacter(character.id));
    });
    createPagination(totalPages, page, characters);
}
export function showCharacter(characterId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const containerMain = document.getElementById("containerMain");
            containerMain.replaceChildren();
            const characterResponse = yield fetchCharacter(characterId);
            const characterData = characterResponse;
            const characterDetailsContainer = document.createElement("div");
            characterDetailsContainer.setAttribute("class", "character-details container flex-column ");
            containerMain.appendChild(characterDetailsContainer);
            const characterDetailsDiv = document.createElement("div");
            characterDetailsDiv.setAttribute("class", "container d-flex flex-column justify-content-center text-center ");
            characterDetailsContainer.appendChild(characterDetailsDiv);
            const characterImage = document.createElement("img");
            characterImage.style.width = "70%";
            characterImage.setAttribute("class", "mx-auto");
            characterImage.setAttribute("src", characterData.image);
            characterDetailsDiv.appendChild(characterImage);
            const pName = document.createElement("p");
            pName.textContent = `Name: ${characterData.name}`;
            characterDetailsDiv.appendChild(pName);
            const pStatus = document.createElement("p");
            pStatus.textContent = `Status: ${characterData.status}`;
            characterDetailsDiv.appendChild(pStatus);
            const pSpecies = document.createElement("p");
            pSpecies.textContent = `Species: ${characterData.species}`;
            characterDetailsDiv.appendChild(pSpecies);
            const pGender = document.createElement("p");
            pGender.textContent = `Gender: ${characterData.gender}`;
            characterDetailsDiv.appendChild(pGender);
            const pOrigin = document.createElement("p");
            pOrigin.textContent = `Origin: ${characterData.origin.name}`;
            characterDetailsDiv.appendChild(pOrigin);
            const pLocation = document.createElement("p");
            pLocation.textContent = `Location: ${characterData.location.name}`;
            characterDetailsDiv.appendChild(pLocation);
            try {
                const episodePromises = characterData.episode.map((urlEpisode) => fetch(urlEpisode).then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch episode data");
                    }
                    return response.json();
                }));
                const episodes = yield Promise.all(episodePromises);
                const episodesListDiv = document.createElement("div");
                episodesListDiv.setAttribute("class", "container d-flex flex-wrap   ");
                episodesListDiv.style.width = "98%";
                characterDetailsContainer.appendChild(episodesListDiv);
                const episodeList = document.createElement("ul");
                episodeList.setAttribute("class", " d-flex flex-wrap row-cols-1 row-cols-sm-3 row-cols-md-5 g-3 ");
                episodesListDiv.appendChild(episodeList);
                let number = 1;
                episodes.forEach((episode) => {
                    number++;
                    const episodeItemLi = document.createElement("li");
                    episodeItemLi.setAttribute("class", `col card p-2 mx-4 my-4 shadow card-transform`);
                    episodeItemLi.textContent = `Episode: ${episode.name} | ${episode.episode}`;
                    episodeList.appendChild(episodeItemLi);
                });
            }
            catch (error) {
                console.error("Error fetching episode data:", error);
            }
        }
        catch (error) {
            console.error("Error fetching character data:", error);
        }
    });
}
export function fetchCharacter(characterId) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlCharacter = `https://rickandmortyapi.com/api/character/${characterId}`;
        const response = yield fetch(urlCharacter);
        const data = yield response.json();
        return data;
    });
}
//# sourceMappingURL=index.js.map