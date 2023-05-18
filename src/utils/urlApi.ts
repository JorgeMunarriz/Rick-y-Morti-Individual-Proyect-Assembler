export const urlApi = "https://rickandmortyapi.com/api";
export const urlCharacters = `${urlApi}/character`;
export const urlLocations = `${urlApi}/location`;
export const urlEpisodes = `${urlApi}/episode`;

export function webPageSearchEngine() {
  const buttonSearchNames = document.getElementById("searchBtn");
  buttonSearchNames?.addEventListener("click", () => {
    const searchTerm = (
      document.getElementById("inputSearch") as HTMLInputElement
    ).value;
    searchElements(searchTerm);
  });
  const searchElements = async (searchTerm: string) => {
    const containerMain = document.getElementById(
      "containerMain"
    ) as HTMLElement;
    containerMain.replaceChildren();

    try {
      const charactersResponse = await fetch(urlCharacters);
      const charactersData = await charactersResponse.json();
      // const characters = charactersData.results;

      const locationsResponse = await fetch(urlLocations);
      const locationsData = await locationsResponse.json();
      // const locations = locationsData.results;

      const episodesResponse = await fetch(urlEpisodes);
      const episodesData = await episodesResponse.json();
      // const episodes = episodesData.results;

      const baseUrlCharacter = "https://rickandmortyapi.com/api/character";
      const allCharacters = [];

      for (let page = 1; page <= 42; page++) {
        const response = await fetch(`${baseUrlCharacter}?page=${page}`);
        const data = await response.json();
        const characters = data.results;

        allCharacters.push(...characters);
      }
      const baseUrlLocation = "https://rickandmortyapi.com/api/location";
      const allLocations = [];

      for (let page = 1; page <= 7; page++) {
        const response = await fetch(`${baseUrlLocation}?page=${page}`);
        const data = await response.json();
        const locations = data.results;

        allLocations.push(...locations);
      }
      const baseUrlEpisode = "https://rickandmortyapi.com/api/episode";
      const allEpisodes = [];

      for (let page = 1; page <= 3; page++) {
        const response = await fetch(`${baseUrlEpisode}?page=${page}`);
        const data = await response.json();
        const episodes = data.results;

        allEpisodes.push(...episodes);
      }

      const elementsToSearch = [
        ...allCharacters,
        ...allLocations,
        ...allEpisodes,
      ];

      for (let i = 0; i < elementsToSearch.length; i++) {
        const element = elementsToSearch[i];
        const text = element.name.toLowerCase();

        if (text.includes(searchTerm.toLowerCase())) {
          containerMain.setAttribute(
            "class",
            "container d-flex row container-main-div"
          );
          containerMain.style.minWidth = "500px";
          if (element.status) {
            const elementCard = document.createElement("div") as HTMLDivElement;
            elementCard.setAttribute(
              "class",
              "container d-flex row col card mx-1 p-0 text-center "
            );
            containerMain.appendChild(elementCard);

            const characterImage = document.createElement(
              "img"
            ) as HTMLImageElement;
            characterImage.setAttribute("src", element.image);
            characterImage.style.width = "100%";
            elementCard.appendChild(characterImage);

            const pName = document.createElement("p") as HTMLParagraphElement;
            pName.textContent = `Name: ${element.name}`;
            elementCard.appendChild(pName);

            const pStatus = document.createElement("p") as HTMLParagraphElement;
            pStatus.textContent = `Status: ${element.status}`;
            elementCard.appendChild(pStatus);

            const pSpecies = document.createElement(
              "p"
            ) as HTMLParagraphElement;
            pSpecies.textContent = `Species: ${element.species}`;
            elementCard.appendChild(pSpecies);
          } else if (element.episode) {
            const elementCard = document.createElement("div") as HTMLDivElement;
            elementCard.setAttribute("class", "col card mx-1 p-0 text-center");
            containerMain?.appendChild(elementCard);
            const h2Episode = document.createElement(
              "h2"
            ) as HTMLHeadingElement;
            h2Episode.textContent = `Title: ${element.name}`;
            elementCard.appendChild(h2Episode);

            const pEpisode = document.createElement(
              "p"
            ) as HTMLParagraphElement;
            pEpisode.textContent = `Episode: ${element.episode}`;
            elementCard.appendChild(pEpisode);

            const pAirDate = document.createElement(
              "p"
            ) as HTMLParagraphElement;
            pAirDate.textContent = `Air Date: ${element.air_date}`;
            elementCard.appendChild(pAirDate);

            // Agregar el resto de los detalles del episodio si es necesario
          } else if (element.dimension) {
            const elementCard = document.createElement("div") as HTMLDivElement;
            elementCard.setAttribute("class", "container d-flex row ");
            containerMain.appendChild(elementCard);

            const h2Location = document.createElement(
              "h2"
            ) as HTMLHeadingElement;
            h2Location.textContent = `Title: ${element.name}`;
            elementCard.appendChild(h2Location);

            const pType = document.createElement("p") as HTMLParagraphElement;
            pType.textContent = `Type: ${element.type}`;
            elementCard.appendChild(pType);

            const pDimension = document.createElement(
              "p"
            ) as HTMLParagraphElement;
            pDimension.textContent = `Dimension: ${element.dimension}`;
            elementCard.appendChild(pDimension);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
}
