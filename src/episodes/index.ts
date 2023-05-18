import { urlEpisodes } from "../utils/urlApi.js";
import { Episode, seasons, Season } from "../interfaces.js";
import { Character } from "../interfaces.js";
import { urlCharacters } from "../utils/urlApi.js";
import { showCharacter, fetchCharacter } from "../characters/index.js";

const listSeasons: string[] = [];
const ulListSeasons = document.getElementById("ulListSeason") as HTMLElement;
export const createSeasonsList = async () => {
  try {
    const episodes = await fetchEpisodes();
    let episodeCounter = 0;

    seasons.forEach((season) => {
      let episodeRange: Episode[] = [];
      if (season.id === 1) {
        // First season with 11 episodes
        episodeRange = episodes.slice(0, 11);
        episodeCounter = 11; // Actualizamos el contador de episodios
      } else if (season.id === 6) {
        // Sixth season with "coming soon" episode
        episodeRange = [
          {
            id: 52,
            name: "Coming Soon",
            air_date: "",
            episode: "",
            characters: [],
          },
        ];
      } else {
        // Other seasons with 10 episodes
        episodeRange = episodes.slice(episodeCounter, episodeCounter + 10);
        episodeCounter += 10;
      }
      const homeSeasons = document.getElementById("homeSeasons") as HTMLElement;
      const seasonLi = document.createElement("li");
      seasonLi.setAttribute("class", "nav-item pe-auto");
      ulListSeasons.appendChild(seasonLi);

      const divDropdown = document.createElement("div");
      divDropdown.setAttribute("class", "dropdown");
      seasonLi.appendChild(divDropdown);

      const linkSeason = document.createElement("button");
      linkSeason.setAttribute(
        "class",
        "nav-link pe-auto d-flex align-items-center text-white text-decoration-none dropdown-toggle gap-2"
      );
      linkSeason.setAttribute("data-bs-toggle", "dropdown");
      linkSeason.setAttribute("aria-expanded", "false");

      divDropdown.appendChild(linkSeason);
      const strongTitle = document.createElement("strong");
      strongTitle.textContent = season.name;
      linkSeason.appendChild(strongTitle);
      const ulListOfEpisodes = document.createElement("ul");
      ulListOfEpisodes.setAttribute(
        "class",
        "dropdown-menu dropdown-menu-dark text-small shadow"
      );
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
          const containerMain = document.getElementById("containerMain") as HTMLElement;
          containerMain.replaceChildren(); // Eliminate childrens
          const episodeDiv = document.createElement("div");
          episodeDiv.setAttribute("class", "row mb-4 text center");
          const titleDiv = document.createElement("div");
          titleDiv.setAttribute(
            "class",
            "col align-items-center justify-center text center"
          );
          episodeDiv.appendChild(titleDiv);
          const h2Title = document.createElement("h2");
          h2Title.textContent = ` ${episode.name}`;
          titleDiv.appendChild(h2Title);
          const h3Details = document.createElement("h3");
          h3Details.textContent = `Air Date: ${episode.air_date} | Episode: ${episode.episode}`;

          titleDiv.appendChild(h3Details);
          const divContainerCharacters = document.createElement("div");
          divContainerCharacters.setAttribute(
            "class",
            "row row-cols-1 row-cols-sm-4 row-cols-md-5 mx-1 g-3"
          );
          episodeDiv.appendChild(divContainerCharacters);
          const characterPromises = (episode.characters || []).map(
            (characterURL) => {
              return fetch(characterURL)
                .then((response) => response.json())
                .catch((error) => {
                  console.error("Error fetching character data:", error);
                });
            }
          );

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
                characterDiv.addEventListener("click", () =>
                  showCharacter(character.id)
                );
                
              });
            })
            .catch((error) => {
              console.error("Error fetching character data:", error);
            });

          containerMain?.appendChild(episodeDiv);
        });
      });
    });
  } catch (error) {
    console.error("Error getting the episodes", error);
  }
};

const fetchEpisodes = async (): Promise<Episode[]> => {
  let allEpisodes: Episode[] = [];
  let nextPageUrl = urlEpisodes;

  while (nextPageUrl) {
    const res = await fetch(nextPageUrl);
    const data = await res.json();
    const episodes: Episode[] = data.results.map((episodeData: any) => {
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
};

export const createEpisodesNavBarList = async (): Promise<void> => {
  try {
    const episodes = await fetchEpisodes();

    episodes.forEach((episode) => {
      // console.log(episodes)
      const ulListOfEpisodes = document.getElementById(
        "listOfEpisodes"
      ) as HTMLElement;

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
        console.log("funciona");
        containerMain?.replaceChildren(); // Eliminar todos los hijos de containerMain
        const episodeDiv = document.createElement("div");
        episodeDiv.setAttribute("class", "row mb-4 text center");
        const titleDiv = document.createElement("div");
        titleDiv.setAttribute(
          "class",
          "col align-items-center justify-center text center"
        );
        episodeDiv.appendChild(titleDiv);
        const h2Title = document.createElement("h2");
        h2Title.textContent = ` ${episode.name}`;
        titleDiv.appendChild(h2Title);
        const h3Details = document.createElement("h3");
        h3Details.textContent = `${episode.air_date} | Episode: ${episode.episode}`;

        titleDiv.appendChild(h3Details);
        const divContainerCharacters = document.createElement("div");
        divContainerCharacters.setAttribute(
          "class",
          "row row-cols-1 row-cols-sm-4 row-cols-md-5 mx-1 g-3"
        );
        episodeDiv.appendChild(divContainerCharacters);
        const characterPromises = (episode.characters || []).map(
          (characterURL) => {
            return fetch(characterURL)
              .then((response) => response.json())
              .catch((error) => {
                console.error("Error fetching character data:", error);
              });
          }
        );

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
              characterDiv.addEventListener("click", () =>
                showCharacter(characterData.id)
              );
              console.log(characterData.id);
            });
          })
          .catch((error) => {
            console.error("Error fetching character data:", error);
          });

        containerMain?.appendChild(episodeDiv);
      });
    });
  } catch (error) {
    console.error("Error getting the episodes", error);
  }
};
