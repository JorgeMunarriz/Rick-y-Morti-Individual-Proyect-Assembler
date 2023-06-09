import { urlCharacters } from "../utils/urlApi.js";
import {
  ResultCharacter,
  Character
} from "../interfaces.js";

export const getCharacters = async () => {
  try {
    const characterBtn = document.getElementById(
      "charactersBtn"
    ) as HTMLButtonElement;
    const characters = await fetchCharacters();
    const totalPages = calculateTotalPages(characters.length);

    characterBtn.addEventListener("click", () =>
      showCharacters(characters, totalPages, 1)
    );
  } catch (error) {
    console.error("Error getting characters", error);
  }
};

const fetchCharacters = async (): Promise<Character[]> => {
  let allCharacters: ResultCharacter[] = [];
  let nextPageUrl = urlCharacters;

  while (nextPageUrl) {
    const res = await fetch(nextPageUrl);
    const data = await res.json();
    const characters: Character[] = data.results.map((characterData: any) => {
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
    allCharacters = allCharacters.concat(characters as ResultCharacter[]);
    nextPageUrl = data.info.next;
  }
  return allCharacters as Character[];
};
const createPagination = (
  totalPages: number,
  page: number,
  characters: Character[]
) => {
  const containerMain = document.getElementById("containerMain") as HTMLElement;
  const paginationContainer = document.createElement("div") as HTMLDivElement;
  paginationContainer.setAttribute("id", "paginationContainer")
  paginationContainer.setAttribute("class", "d-flex justify-content-center");
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";
  containerMain.appendChild(paginationContainer);

  const paginationList = document.createElement("ul") as HTMLUListElement;
  paginationList.classList.add("pagination");
  paginationContainer.appendChild(paginationList);

  const prevPageItem = document.createElement("li") as HTMLLIElement;
  prevPageItem.classList.add("page-item");
  const prevPageLink = document.createElement("button") as HTMLButtonElement;
  prevPageLink.setAttribute("id", "prevPageBtn");
  prevPageLink.classList.add("page-link");
  prevPageLink.textContent = "Previous";
  prevPageItem.appendChild(prevPageLink);
  paginationList.appendChild(prevPageItem);

  const startPage = Math.max(1, page - 2); // Starting page number in range
  const endPage = Math.min(totalPages, page + 2); // Ending page number in range

  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement("li") as HTMLLIElement;
    pageItem.classList.add("page-item");
    const pageLink = document.createElement("button") as HTMLButtonElement;
    pageLink.classList.add("page-link");
    pageLink.setAttribute("id", `page${i}`);
    pageLink.textContent = i.toString();
    pageItem.appendChild(pageLink);
    paginationList.appendChild(pageItem);

    // Add click event to page buttons
    pageLink.addEventListener("click", () => {
      showCharacters(characters, totalPages, i); // Pass the page number as an argument
    });

    // Set the 'active' class to the button on the current page
    if (i === page) {
      pageItem.classList.add("active");
    }
  }

  const nextPageItem = document.createElement("li") as HTMLLIElement;
  nextPageItem.classList.add("page-item");
  const nextPageLink = document.createElement("button")  as HTMLButtonElement;
  nextPageLink.setAttribute("id", "nextPageBtn");
  nextPageLink.classList.add("page-link");
  nextPageLink.textContent = "Next";
  nextPageItem.appendChild(nextPageLink);
  paginationList.appendChild(nextPageItem);

  // Add click event to the "Next" button
  nextPageLink.addEventListener("click", () => {
    if (page < totalPages) {
      showCharacters(characters, totalPages, page + 1); // Show next page
    }
  });

  // Add click event to "Previous" button
  prevPageLink.addEventListener("click", () => {
    if (page > 1) {
      showCharacters(characters, totalPages, page - 1); // Show previous page
    }
  });
};

const calculateTotalPages = (totalCharacters: number) => {
  const charactersPerPage = 20;
  return Math.ceil(totalCharacters / charactersPerPage);
};

function showCharacters(
  characters: Character[],
  totalPages: number,
  page: number
) {
  const containerMain = document.getElementById("containerMain") as HTMLElement;
  
  if (!containerMain) return;

  containerMain.innerHTML = "";
  const charactersPerPage = 20;
  const startIndex = (page - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;

  const charactersToDisplay = characters.slice(startIndex, endIndex);
  const titleCharactersDiv = document.createElement("h2") as HTMLHeadingElement;
  titleCharactersDiv.setAttribute(
    "class",
    "text-center my-3 p-0 "
  );
  titleCharactersDiv.textContent ="Characters";
  containerMain.appendChild(titleCharactersDiv)

  const divContainerCharacters = document.createElement("div") as HTMLDivElement;
  divContainerCharacters.setAttribute(
    "class",
    "row row-cols-1 row-cols-sm-4 row-cols-md-5 justify-content-center g-3 "
  );
  containerMain.appendChild(divContainerCharacters);
  

  charactersToDisplay.forEach((character) => {
    const characterDiv = document.createElement("div") as HTMLDivElement;
    characterDiv.setAttribute(
      "class",
      "col card mx-1 p-0 text-center card-transform shadow"
    );
    characterDiv.setAttribute("id", `character${character.id}`);
    divContainerCharacters.appendChild(characterDiv);

    const characterImage = document.createElement("img") as HTMLImageElement;
    characterImage.setAttribute("src", character.image);
    characterDiv.appendChild(characterImage);

    const pName = document.createElement("p") as HTMLParagraphElement;
    pName.textContent = `Name: ${character.name}`;
    characterDiv.appendChild(pName);

    const pStatus = document.createElement("p") as HTMLParagraphElement;
    pStatus.textContent = `Status: ${character.status}`;
    characterDiv.appendChild(pStatus);

    const pSpecies = document.createElement("p") as HTMLParagraphElement;
    pSpecies.textContent = `Species: ${character.species}`;
    characterDiv.appendChild(pSpecies);
    const pGender = document.createElement("p") as HTMLParagraphElement;
    pGender.textContent = `Gender: ${character.gender}`;
    characterDiv.appendChild(pGender);

    const pOrigin = document.createElement("p") as HTMLParagraphElement;
    pOrigin.textContent = `Origin: ${character.origin}`;
    characterDiv.appendChild(pOrigin);
    const pLocation = document.createElement("p") as HTMLParagraphElement;
    pLocation.textContent = `Location: ${character.location}`;
    characterDiv.appendChild(pLocation);
    characterDiv.addEventListener("click", () => showCharacter(character.id));
  });
  createPagination(totalPages, page, characters);
}
export async function showCharacter(characterId: number) {
  try {
    const containerMain = document.getElementById(
      "containerMain"
    ) as HTMLElement;
    containerMain.replaceChildren();
    const characterResponse = await fetchCharacter(characterId);
    const characterData: Character = characterResponse;

    // Create Container of character details
    const characterDetailsContainer = document.createElement("div") as HTMLDivElement;
    characterDetailsContainer.setAttribute("class", "character-details container flex-column ");
    containerMain.appendChild(characterDetailsContainer);
    const characterDetailsDiv = document.createElement("div") as HTMLDivElement;
    characterDetailsDiv.setAttribute("class", "container d-flex flex-column justify-content-center text-center ");
    characterDetailsContainer.appendChild(characterDetailsDiv);
    // Show character Image
    const characterImage = document.createElement("img") as HTMLImageElement;
    characterImage.style.width="70%";
    characterImage.setAttribute("class", "mx-auto")
    characterImage.setAttribute("src", characterData.image);
    characterDetailsDiv.appendChild(characterImage);

    // Show character name
    const pName = document.createElement("p") as HTMLParagraphElement;
    pName.textContent = `Name: ${characterData.name}`;
    characterDetailsDiv.appendChild(pName);

    // Show character status
    const pStatus = document.createElement("p") as HTMLParagraphElement;
    pStatus.textContent = `Status: ${characterData.status}`;
    characterDetailsDiv.appendChild(pStatus);

    // Show character species
    const pSpecies = document.createElement("p") as HTMLParagraphElement;
    pSpecies.textContent = `Species: ${characterData.species}`;
    characterDetailsDiv.appendChild(pSpecies);

    // Show character gender
    const pGender = document.createElement("p") as HTMLParagraphElement;
    pGender.textContent = `Gender: ${characterData.gender}`;
    characterDetailsDiv.appendChild(pGender);

    // Show character gender
    const pOrigin = document.createElement("p") as HTMLParagraphElement;
    pOrigin.textContent = `Origin: ${characterData.origin.name}`;
    characterDetailsDiv.appendChild(pOrigin);

    // Show character location
    const pLocation = document.createElement("p") as HTMLParagraphElement;
    pLocation.textContent = `Location: ${characterData.location.name}`;
    characterDetailsDiv.appendChild(pLocation);

    // Get character´s episode
    try {
      const episodePromises = characterData.episode.map((urlEpisode: string) =>
        fetch(urlEpisode).then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch episode data");
          }
          return response.json();
        })
      );

      const episodes = await Promise.all(episodePromises);

      const episodesListDiv = document.createElement("div") as HTMLDivElement;
        episodesListDiv.setAttribute("class", "container d-flex flex-wrap   ")
        episodesListDiv.style.width = "98%"
        characterDetailsContainer.appendChild(episodesListDiv);


      // Show the episodes in which the character appears
      const episodeList = document.createElement("ul") as HTMLUListElement;
      episodeList.setAttribute("class", " d-flex flex-wrap row-cols-1 row-cols-sm-3 row-cols-md-5 g-3 ")
      episodesListDiv.appendChild(episodeList);
        let number: number = 1
      episodes.forEach((episode: any) => {
        number++;
        const episodeItemLi = document.createElement("li") as HTMLLIElement;
        episodeItemLi.setAttribute("class", `col card p-2 mx-4 my-4 shadow card-transform`)
        episodeItemLi.textContent = `Episode: ${episode.name} | ${episode.episode}`;
        episodeList.appendChild(episodeItemLi);
      });
      
      
    } catch (error) {
      console.error("Error fetching episode data:", error);
    }
  } catch (error) {
    console.error("Error fetching character data:", error);
  }
}

export async function fetchCharacter(characterId: number): Promise<Character> {
  const urlCharacter = `https://rickandmortyapi.com/api/character/${characterId}`;
  const response = await fetch(urlCharacter);
  const data = await response.json();
  return data;
}
