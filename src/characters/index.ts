import { urlCharacters } from "../utils/urlApi.js";
import {
  ResultCharacter,
  Character,
  CharacterLocation, Location
} from "../interfaces.js";

export const getCharacters = async () => {
  try {
    const characterBtn = document.getElementById("charactersBtn");
    const characters = await fetchCharacter();
    const totalPages = calculateTotalPages(characters.length);

    characterBtn?.addEventListener("click", () =>
      showCharacters(characters, totalPages, 1),
    );
  } catch (error) {
    console.error("Error getting characters", error);
  }
};

const fetchCharacter = async (): Promise<Character[]> => {
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
        location: characterData.name,
  
      };
    });
    allCharacters = allCharacters.concat(characters as ResultCharacter[]);
    nextPageUrl = data.info.next;
  }
  return allCharacters as Character[];
};
const createPagination = (totalPages: number, page: number, characters: Character[]) => {
  const containerMain = document.getElementById("containerMain");
  const paginationContainer = document.createElement("div");
  paginationContainer.setAttribute("id", "paginationContainer");
  if (!paginationContainer) return;

  paginationContainer.innerHTML = "";
  containerMain?.appendChild(paginationContainer);

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

  const startPage = Math.max(1, page - 2); // Número de página inicial en el rango
  const endPage = Math.min(totalPages, page + 2); // Número de página final en el rango

  for (let i = startPage; i <= endPage; i++) {
    const pageItem = document.createElement("li");
    pageItem.classList.add("page-item");
    const pageLink = document.createElement("button");
    pageLink.classList.add("page-link");
    pageLink.setAttribute("id", `page${i}`);
    pageLink.textContent = i.toString();
    pageItem.appendChild(pageLink);
    paginationList.appendChild(pageItem);

    // Agregar evento click a los botones de página
    pageLink.addEventListener("click", () => {
      showCharacters(characters, totalPages, i); // Pasar el número de página como argumento
    });

    // Establecer la clase 'active' al botón de la página actual
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

  // Agregar evento click al botón "Next"
  nextPageLink.addEventListener("click", () => {
    if (page < totalPages) {
      showCharacters(characters, totalPages, page + 1); // Mostrar la siguiente página
    }
  });

  // Agregar evento click al botón "Previous"
  prevPageLink.addEventListener("click", () => {
    if (page > 1) {
      showCharacters(characters, totalPages, page - 1); // Mostrar la página anterior
    }
  });
};




const calculateTotalPages = (totalCharacters: number) => {
  const charactersPerPage = 20;
  return Math.ceil(totalCharacters / charactersPerPage);
};

function showCharacters(characters: Character[], totalPages: number, page: number) {
  const containerMain = document.getElementById("containerMain");
  const currentPage = page;
  if (!containerMain) return;

  containerMain.innerHTML = "";
  const charactersPerPage = 20;
  const startIndex = (page - 1) * charactersPerPage;
  const endIndex = startIndex + charactersPerPage;

  const charactersToDisplay = characters.slice(startIndex, endIndex);

  const divContainerCharacters = document.createElement("div");
  divContainerCharacters.setAttribute(
    "class",
    "row row-cols-1 row-cols-sm-4 row-cols-md-5 mx-1 g-3"
  );
  containerMain.appendChild(divContainerCharacters);

  charactersToDisplay.forEach((character) => {
    const characterDiv = document.createElement("div");
    characterDiv.setAttribute("class", "col card mx-1");
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
    pOrigin.textContent = `Origin: ${character.location.name}`;
    characterDiv.appendChild(pOrigin);
    

    
  });
  createPagination(totalPages, page, characters);
}
