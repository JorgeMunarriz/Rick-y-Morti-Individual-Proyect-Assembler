export const urlApi = "https://rickandmortyapi.com/api";
export const urlCharacters = `${urlApi}/character`;
export const urlLocations = `${urlApi}/location`;
export const urlEpisodes = `${urlApi}/episode`;

export const searchElements = async (searchTerm: string) => {
    console.log("eso ees")
    const containerMain = document.getElementById("containerMain");
    containerMain?.replaceChildren();
  
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
      
        const baseUrlCharacter = 'https://rickandmortyapi.com/api/character';
        const allCharacters = [];
      
        for (let page = 1; page <= 42; page++) {
          const response = await fetch(`${baseUrlCharacter}?page=${page}`);
          const data = await response.json();
          const characters = data.results;
      
          allCharacters.push(...characters);
          
        }
        const baseUrlLocation = 'https://rickandmortyapi.com/api/location';
        const allLocations = [];
      
        for (let page = 1; page <= 7; page++) {
          const response = await fetch(`${baseUrlLocation}?page=${page}`);
          const data = await response.json();
          const locations = data.results;
      
          allLocations.push(...locations);
          
        }
        const baseUrlEpisode = 'https://rickandmortyapi.com/api/episode';
        const allEpisodes = [];
      
        for (let page = 1; page <= 3; page++) {
          const response = await fetch(`${baseUrlEpisode}?page=${page}`);
          const data = await response.json();
          const episodes = data.results;
      
          allEpisodes.push(...episodes);
          
        }
      
       
      
      
  
      const elementsToSearch = [...allCharacters, ...allLocations, ...allEpisodes];
      console.log(elementsToSearch)
      for (let i = 0; i < elementsToSearch.length; i++) {
        const element = elementsToSearch[i];
        const text = element.name.toLowerCase();
        
        
        if (text.includes(searchTerm.toLowerCase())) {
          
          if (element.status) {
            const elementCard = document.createElement("div");
            containerMain?.appendChild(elementCard);
            const characterImage = document.createElement("img");
            characterImage.setAttribute("src", element.image);
            elementCard.appendChild(characterImage);
  
            const pName = document.createElement("p");
            pName.textContent = `Name: ${element.name}`;
            elementCard.appendChild(pName);
  
            const pStatus = document.createElement("p");
            pStatus.textContent = `Status: ${element.status}`;
            elementCard.appendChild(pStatus);
  
            const pSpecies = document.createElement("p");
            pSpecies.textContent = `Species: ${element.species}`;
            elementCard.appendChild(pSpecies);
          } else if (element.episode) {
            const elementCard = document.createElement("div");
            containerMain?.appendChild(elementCard);
  
            const h2Episode = document.createElement("h2");
            h2Episode.textContent = `Title: ${element.name}`;
            elementCard.appendChild(h2Episode);
  
            const pEpisode = document.createElement("p");
            pEpisode.textContent = `Episode: ${element.episode}`;
            elementCard.appendChild(pEpisode);
  
            const pAirDate = document.createElement("p");
            pAirDate.textContent = `Air Date: ${element.air_date}`;
            elementCard.appendChild(pAirDate);
  
            // Agregar el resto de los detalles del episodio si es necesario
          } else if (element.dimension) {
            const elementCard = document.createElement("div");
            containerMain?.appendChild(elementCard);
  
            const h2Location = document.createElement("h2");
            h2Location.textContent = `Title: ${element.name}`;
            elementCard.appendChild(h2Location);
  
            const pType = document.createElement("p");
            pType.textContent = `Type: ${element.type}`;
            elementCard.appendChild(pType);
  
            const pDimension = document.createElement("p");
            pDimension.textContent = `Dimension: ${element.dimension}`;
            elementCard.appendChild(pDimension);
  
            // Agregar el resto de los detalles de la ubicación si es necesario
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };