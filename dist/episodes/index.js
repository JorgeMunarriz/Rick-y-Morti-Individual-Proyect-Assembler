var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { urlEpisodes } from "../utils/urlApi.js";
import { seasons } from "../interfaces.js";
import { showCharacter } from "../characters/index.js";
const ulListSeasons = document.getElementById("ulListSeason");
export const createSeasonsList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const episodes = yield fetchEpisodes();
        let episodeCounter = 0;
        seasons.forEach((season) => {
            let episodeRange = [];
            if (season.id === 1) {
                episodeRange = episodes.slice(0, 11);
                episodeCounter = 11;
            }
            else if (season.id === 6) {
                episodeRange = [
                    {
                        id: 52,
                        name: "Coming Soon",
                        air_date: "",
                        episode: "",
                        characters: [],
                    },
                ];
            }
            else {
                episodeRange = episodes.slice(episodeCounter, episodeCounter + 10);
                episodeCounter += 10;
            }
            const homeSeasons = document.getElementById("homeSeasons");
            const seasonLi = document.createElement("li");
            seasonLi.setAttribute("class", "nav-item pe-auto");
            ulListSeasons.appendChild(seasonLi);
            const divDropdown = document.createElement("div");
            divDropdown.setAttribute("class", "dropdown");
            seasonLi.appendChild(divDropdown);
            const linkSeason = document.createElement("button");
            linkSeason.setAttribute("class", "nav-link pe-auto d-flex align-items-center text-white text-decoration-none dropdown-toggle gap-2");
            linkSeason.setAttribute("data-bs-toggle", "dropdown");
            linkSeason.setAttribute("aria-expanded", "false");
            divDropdown.appendChild(linkSeason);
            const strongTitle = document.createElement("strong");
            strongTitle.textContent = season.name;
            linkSeason.appendChild(strongTitle);
            const ulListOfEpisodes = document.createElement("ul");
            ulListOfEpisodes.setAttribute("class", "dropdown-menu dropdown-menu-dark text-small shadow");
            ulListOfEpisodes.setAttribute("id", `episodesList-${season.id}`);
            divDropdown.appendChild(ulListOfEpisodes);
            linkSeason.onclick = function () {
                homeSeasons.classList.remove("active");
                linkSeason.classList.toggle("active");
                ulListOfEpisodes.onclick = function () {
                    linkSeason.classList.remove("active");
                };
            };
            episodeRange.forEach((episode) => {
                const episodeLi = document.createElement("li");
                episodeLi.setAttribute("class", "dropdown-item");
                episodeLi.setAttribute("data-elementnumber", episode.id.toString());
                ulListOfEpisodes.appendChild(episodeLi);
                const episodeLink = document.createElement("a");
                episodeLink.setAttribute("class", "dropdown-item ");
                episodeLink.setAttribute("type", "button");
                episodeLink.setAttribute("data-elementnumber", episode.id.toString());
                episodeLink.textContent = `Episode: ${episode.id}, ${episode.name}`;
                episodeLi.appendChild(episodeLink);
                episodeLink.addEventListener("click", () => {
                    const containerMain = document.getElementById("containerMain");
                    containerMain.replaceChildren();
                    const episodeDiv = document.createElement("div");
                    episodeDiv.setAttribute("class", "row mb-4 text center");
                    const titleDiv = document.createElement("div");
                    titleDiv.setAttribute("class", "col align-items-center justify-center text center");
                    episodeDiv.appendChild(titleDiv);
                    const h2Title = document.createElement("h2");
                    h2Title.textContent = ` ${episode.name}`;
                    titleDiv.appendChild(h2Title);
                    const h3Details = document.createElement("h3");
                    h3Details.textContent = `Air Date: ${episode.air_date} | Episode: ${episode.episode}`;
                    titleDiv.appendChild(h3Details);
                    const divContainerCharacters = document.createElement("div");
                    divContainerCharacters.setAttribute("class", "row row-cols-1 row-cols-sm-4 row-cols-md-5 mx-1 g-3 ");
                    episodeDiv.appendChild(divContainerCharacters);
                    const characterPromises = (episode.characters || []).map((characterURL) => {
                        return fetch(characterURL)
                            .then((response) => response.json())
                            .catch((error) => {
                            console.error("Error fetching character data:", error);
                        });
                    });
                    Promise.all(characterPromises)
                        .then((characterDataArray) => {
                        characterDataArray.forEach((character) => {
                            const characterDiv = document.createElement("div");
                            characterDiv.setAttribute("class", "col card mx-1");
                            characterDiv.setAttribute("id", `character${character.id}`);
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
                            pOrigin.textContent = `Origin: ${character.origin.name}`;
                            characterDiv.appendChild(pOrigin);
                            divContainerCharacters.appendChild(characterDiv);
                            characterDiv.addEventListener("click", () => showCharacter(character.id));
                        });
                    })
                        .catch((error) => {
                        console.error("Error fetching character data:", error);
                    });
                    containerMain.appendChild(episodeDiv);
                });
            });
        });
    }
    catch (error) {
        console.error("Error getting the episodes", error);
    }
});
const fetchEpisodes = () => __awaiter(void 0, void 0, void 0, function* () {
    let allEpisodes = [];
    let nextPageUrl = urlEpisodes;
    while (nextPageUrl) {
        const res = yield fetch(nextPageUrl);
        const data = yield res.json();
        const episodes = data.results.map((episodeData) => {
            return {
                id: episodeData.id,
                name: episodeData.name,
                air_date: episodeData.air_date,
                episode: episodeData.episode,
                characters: episodeData.characters,
            };
        });
        allEpisodes = allEpisodes.concat(episodes);
        nextPageUrl = data.info.next;
    }
    return allEpisodes;
});
export const createEpisodesNavBarList = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const episodes = yield fetchEpisodes();
        episodes.forEach((episode) => {
            const ulListOfEpisodes = document.getElementById("listOfEpisodes");
            const episodeLi = document.createElement("li");
            episodeLi.setAttribute("class", "dropdown-item");
            episodeLi.setAttribute("data-elementnumber", episode.id.toString());
            ulListOfEpisodes.appendChild(episodeLi);
            const episodeLink = document.createElement("button");
            episodeLink.setAttribute("class", "dropdown-item ");
            episodeLink.setAttribute("type", "button");
            episodeLink.setAttribute("data-elementnumber", episode.id.toString());
            episodeLink.textContent = `Episode: ${episode.id}, ${episode.name}`;
            episodeLi.appendChild(episodeLink);
            episodeLink.addEventListener("click", () => {
                const containerMain = document.getElementById("containerMain");
                containerMain.replaceChildren();
                const episodeDiv = document.createElement("div");
                episodeDiv.setAttribute("class", "row mb-4 text center");
                const titleDiv = document.createElement("div");
                titleDiv.setAttribute("class", "col align-items-center justify-center text center");
                episodeDiv.appendChild(titleDiv);
                const h2Title = document.createElement("h2");
                h2Title.textContent = ` ${episode.name}`;
                titleDiv.appendChild(h2Title);
                const h3Details = document.createElement("h3");
                h3Details.textContent = `${episode.air_date} | Episode: ${episode.episode}`;
                titleDiv.appendChild(h3Details);
                const divContainerCharacters = document.createElement("div");
                divContainerCharacters.setAttribute("class", "row row-cols-1 row-cols-sm-4 row-cols-md-5 mx-1 g-3");
                episodeDiv.appendChild(divContainerCharacters);
                const characterPromises = (episode.characters || []).map((characterURL) => {
                    return fetch(characterURL)
                        .then((response) => response.json())
                        .catch((error) => {
                        console.error("Error fetching character data:", error);
                    });
                });
                Promise.all(characterPromises)
                    .then((characterDataArray) => {
                    characterDataArray.forEach((characterData) => {
                        const characterDiv = document.createElement("div");
                        characterDiv.setAttribute("class", "col card mx-1");
                        characterDiv.setAttribute("id", `character${characterData.id}`);
                        const characterImage = document.createElement("img");
                        characterImage.setAttribute("src", characterData.image);
                        characterDiv.appendChild(characterImage);
                        const pName = document.createElement("p");
                        pName.textContent = `Name: ${characterData.name}`;
                        characterDiv.appendChild(pName);
                        const pStatus = document.createElement("p");
                        pStatus.textContent = `Status: ${characterData.status}`;
                        characterDiv.appendChild(pStatus);
                        const pSpecies = document.createElement("p");
                        pSpecies.textContent = `Species: ${characterData.species}`;
                        characterDiv.appendChild(pSpecies);
                        const pGender = document.createElement("p");
                        pGender.textContent = `Gender: ${characterData.gender}`;
                        characterDiv.appendChild(pGender);
                        const pOrigin = document.createElement("p");
                        pOrigin.textContent = `Origin: ${characterData.origin.name}`;
                        characterDiv.appendChild(pOrigin);
                        divContainerCharacters.appendChild(characterDiv);
                        characterDiv.addEventListener("click", () => showCharacter(characterData.id));
                    });
                })
                    .catch((error) => {
                    console.error("Error fetching character data:", error);
                });
                containerMain.appendChild(episodeDiv);
            });
        });
    }
    catch (error) {
        console.error("Error getting the episodes", error);
    }
});
//# sourceMappingURL=index.js.map