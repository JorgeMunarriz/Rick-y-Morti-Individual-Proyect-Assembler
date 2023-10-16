import { urlLocations } from "../utils/urlApi.js";
import { Location, LocationResponse } from "../interfaces.js";
import { showCharacter } from "../characters/index.js";


const fetchAllLocations = async (): Promise<Location[]> => {
  let nextPageUrl: string | null = urlLocations;
  let allLocations: Location[] = [];
  while (nextPageUrl) {
    const res = await fetch(nextPageUrl);
    const data: LocationResponse = await res.json();
    const locations: Location[] = data.results;
    allLocations = allLocations.concat(locations);
    nextPageUrl = data.info.next;
  }
  return allLocations;
};

// Show list of all locations
export function getLocations() {
  const buttonShowLocations = document.getElementById("locationsBtn") as HTMLButtonElement;
  buttonShowLocations.addEventListener("click", showLocations);
  async function showLocations() {
    const locations = await fetchAllLocations();

    const container = document.getElementById("containerMain") as HTMLElement;
    container.replaceChildren();

    const divContainer = document.createElement("div") as HTMLDivElement;
    divContainer.setAttribute("class", "container mt-3 text-center");
    container.appendChild(divContainer);

    const titleLocation = document.createElement("h2") as HTMLHeadingElement;
    titleLocation.setAttribute("class", "text-align-left");
    divContainer.appendChild(titleLocation);
    titleLocation.textContent = "Locations";

    const divUlLocations = document.createElement("div") as HTMLDivElement;
    divUlLocations.setAttribute("class", "overflow-auto");
    divUlLocations.style.maxHeight = "600px";
    divUlLocations.setAttribute("tabindex", "0");
    divContainer.appendChild(divUlLocations);

    const ulListOfLocations = document.createElement("ul") as HTMLUListElement;
    ulListOfLocations.setAttribute("class", "list-group");
    divUlLocations.appendChild(ulListOfLocations);

    locations.forEach((location) => {
      const listLocation = document.createElement("li") as HTMLLIElement;
      listLocation.setAttribute("class", "list-group-item");
      const linkLocation = document.createElement("a") as HTMLAnchorElement;
      linkLocation.setAttribute("class", "link-item");
      linkLocation.textContent = location.name;
      linkLocation.addEventListener("click", () => showLocation(location));
      listLocation.appendChild(linkLocation);
      ulListOfLocations.appendChild(listLocation);
    });
  }
}
// Show details of specifiec Location
function showLocation(location: Location) {
  const container = document.getElementById("containerMain") as HTMLElement;
  container.replaceChildren();

  const locationDiv = document.createElement("div") as HTMLDivElement;
  locationDiv.setAttribute("class", "location-details container mt-3") ;
  container.appendChild(locationDiv);

  const titleLocation = document.createElement("h2") as HTMLHeadingElement;
  titleLocation.textContent = location.name;
  locationDiv.appendChild(titleLocation);

  const locationInfo = document.createElement("h3") as HTMLParagraphElement;
  locationInfo.textContent = `Type: ${location.type} | Dimension: ${location.dimension}`;
  locationDiv.appendChild(locationInfo);

  const residentsContainer = document.createElement("div") as HTMLDivElement;
  residentsContainer.setAttribute(
    "class",
    "row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-5 p-2"
  );
  locationDiv.appendChild(residentsContainer);

  const characterPromises = location.residents.map(async (characterURL) => {
    try {
      const response = await fetch(characterURL);
      return await response.json();
    } catch (error) {
      console.error("Error fetching character data:", error);
    }
  });

  Promise.all(characterPromises)
    .then((characterDataArray) => {
      characterDataArray.forEach((characterData) => {
        const residentDiv = document.createElement("div") as HTMLDivElement;
        residentDiv.setAttribute("class", "col card mx-1 p-0 shadow card-transform tex-center");
        residentsContainer.appendChild(residentDiv);

        const characterImage = document.createElement("img") as HTMLImageElement;
        characterImage.setAttribute("class", "w-100 p-0 rounded-top");
        characterImage.setAttribute("src", characterData.image);
        residentDiv.appendChild(characterImage)
        const residentDetails = document.createElement("div") as HTMLDivElement;
        residentDetails.setAttribute("class", "p-2 text-center");
        residentDiv.appendChild(residentDetails);;

        const pName = document.createElement("p") as HTMLParagraphElement;
        pName.textContent = `Name: ${characterData.name}`;
        residentDetails.appendChild(pName);

        const pStatus = document.createElement("p") as HTMLParagraphElement;
        pStatus.textContent = `Status: ${characterData.status}`;
        residentDetails.appendChild(pStatus);

        const pSpecies = document.createElement("p") as HTMLParagraphElement;
        pSpecies.textContent = `Species: ${characterData.species}`;
        residentDetails.appendChild(pSpecies);
        const pOrigin = document.createElement("p") as HTMLParagraphElement;
        pOrigin.textContent = `Origin: ${characterData.location.name}`;
        residentDetails.appendChild(pOrigin);
        residentDetails.addEventListener("click", () =>
          showCharacter(characterData.id)
        );
      });
    })
    .catch((error) => {
      console.error("Error fetching character data:", error);
    });
}
