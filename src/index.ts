
import { logIn } from "./utils/signIn.js";
import {  webPageSearchEngine } from "./utils/urlApi.js";
import { createSeasonsList, createEpisodesNavBarList,} from "./episodes/index.js";
import { changeThemesAdd } from "./changeThemes/index.js";
import { getLocations } from "./Locations/index.js";
import { getCharacters } from "./characters/index.js";

logIn();
window.onload = function () {
  changeThemesAdd();
  createSeasonsList();
  getCharacters();
  createEpisodesNavBarList();
  getLocations();
  webPageSearchEngine()
  
};


//   let allEpisodes: Episode[] = [];
//   let nextPageUrl = urlEpisodes;

//   while (nextPageUrl) {
//     const res = await fetch(nextPageUrl);
//     const data = await res.json();
//     const episodes: Episode[] = data.results.map((episodeData: any) => {
//       return {
//         id: episodeData.id,
//         name: episodeData.name,
//         air_date: episodeData.air_date,
//         episode: episodeData.episode,
//         characters: episodeData.characters,
//       };
//     });
//     allEpisodes = allEpisodes.concat(episodes);
//     nextPageUrl = data.info.next;
//   }
//   return allEpisodes;
// };

// const populateSeasons = async () => {
//   try {
//     const episodes = await fetchEpisodes();
//     let episodeCounter = 0;

//     seasons.forEach((season) => {
//       let episodeRange: Episode[] = [];
//       if (season.id === 1) {
//         // First season with 11 episodes
//         episodeRange = episodes.slice(0, 11);
//         episodeCounter = 11; // Actualizamos el contador de episodios
//       } else if (season.id === 6) {
//         // Sixth season with "coming soon" episode
//         episodeRange = [
//           {
//             id: 52,
//             name: "Coming Soon",
//             air_date: "",
//             episode: "",
//             characters: [],
//           },
//         ];
//       } else {
//         // Other seasons with 10 episodes
//         episodeRange = episodes.slice(episodeCounter, episodeCounter + 10);
//         episodeCounter += 10;
//       }

//       const seasonLi = document.createElement("li");
//       seasonLi.setAttribute("class", "nav-item pe-auto");
//       ulListSeasons?.appendChild(seasonLi);

//       const divDropdown = document.createElement("div");
//       divDropdown.setAttribute("class", "dropdown");
//       seasonLi.appendChild(divDropdown);

//       const linkSeason = document.createElement("a");
//       linkSeason.setAttribute(
//         "class",
//         "nav-link pe-auto d-flex align-items-center text-white text-decoration-none dropdown-toggle gap-2"
//       );
//       linkSeason.setAttribute("data-bs-toggle", "dropdown");
//       linkSeason.setAttribute("aria-expanded", "false");
//       divDropdown.appendChild(linkSeason);
//       const strongTitle = document.createElement("strong");
//       strongTitle.textContent = season.name;
//       linkSeason.appendChild(strongTitle);
//       const ulListofEpisodes = document.createElement("ul");
//       ulListofEpisodes.setAttribute(
//         "class",
//         "dropdown-menu dropdown-menu-dark text-small shadow"
//       );
//       ulListofEpisodes.setAttribute("id", `episodesList-${season.id}`);
//       divDropdown.appendChild(ulListofEpisodes);
//       episodeRange.forEach((episode) => {
//         // console.log(episodes)

//         const episodeLi = document.createElement("li");
//         episodeLi.setAttribute("class", "dropdown-item");
//         episodeLi.setAttribute("data-elementnumber", episode.id.toString());
//         ulListofEpisodes.appendChild(episodeLi);
//         const episodeLink = document.createElement("a");
//         episodeLink.setAttribute("class", "dropdown-item ");
//         episodeLink.setAttribute("type", "button");
//         episodeLink.setAttribute("data-elementnumber", episode.id.toString());
//         episodeLink.textContent = `Episode: ${episode.id}, ${episode.name}`;
//         episodeLi.appendChild(episodeLink);

//         episodeLink.addEventListener("click", () => {
//           const containerMain = document.getElementById("containerMain");
//           console.log("funciona");
//           containerMain?.replaceChildren(); // Eliminar todos los hijos de containerMain
//           const episodeDiv = document.createElement("div");
//           episodeDiv.setAttribute("class", "row mb-4 text center");
//           const titleDiv = document.createElement("div");
//           titleDiv.setAttribute(
//             "class",
//             "col align-items-center justify-center text center"
//           );
//           episodeDiv.appendChild(titleDiv);
//           const h2Title = document.createElement("h2");
//           h2Title.textContent = ` ${episode.name}`;
//           titleDiv.appendChild(h2Title);
//           const h3Details = document.createElement("h3");
//           h3Details.textContent = `${episode.air_date} | Episode: ${episode.episode}`;
//           titleDiv.appendChild(h3Details);
//           const divContainerCharacters = document.createElement("div");
//           divContainerCharacters.setAttribute(
//             "class",
//             "row row-cols-1 row-cols-sm-4 row-cols-md-5 mx-1 g-3"
//           );
//           episodeDiv.appendChild(divContainerCharacters);
//           const characterPromises = (episode.characters || []).map(
//             (characterURL) => {
//               return fetch(characterURL)
//                 .then((response) => response.json())
//                 .catch((error) => {
//                   console.error("Error fetching character data:", error);
//                 });
//             }
//           );

//           Promise.all(characterPromises)
//             .then((characterDataArray) => {
//               characterDataArray.forEach((characterData) => {
//                 const characterDiv = document.createElement("div");
//                 characterDiv.setAttribute("class", "col card mx-1");
//                 characterDiv.setAttribute("id", `character${characterData.id}`);

//                 const characterImage = document.createElement("img");
//                 characterImage.setAttribute("src", characterData.image);
//                 characterDiv.appendChild(characterImage);

//                 const pName = document.createElement("p");
//                 pName.textContent = `Name: ${characterData.name}`;
//                 characterDiv.appendChild(pName);

//                 const pStatus = document.createElement("p");
//                 pStatus.textContent = `Status: ${characterData.status}`;
//                 characterDiv.appendChild(pStatus);

//                 const pSpecies = document.createElement("p");
//                 pSpecies.textContent = `Species: ${characterData.species}`;
//                 characterDiv.appendChild(pSpecies);

//                 divContainerCharacters.appendChild(characterDiv);
//                 characterDiv.addEventListener("click", () =>
//                   showCharacter(characterData.id)

//                 );
//                 console.log(characterData.id)
//               });
//             })
//             .catch((error) => {
//               console.error("Error fetching character data:", error);
//             });

//           containerMain?.appendChild(episodeDiv);
//         });
//       });
//     });
//   } catch (error) {
//     console.error("Error getting the episodes", error);
//   }
// };

// populateSeasons();

// function getCharacters (){
//  const character = (urlCharacters);
//  character
//   .then(response => response.json())
//   .then (data => )

// }

// let allLocations: Location[] = [];

// const locationBtn = document.getElementById("locationsBtn");
// locationBtn?.addEventListener("click", showLocations);

// const fetchAllLocations = async (): Promise<Location[]> => {
//   let nextPageUrl: string | null = urlLocations;
//   let allLocations: Location[] = [];

//   while (nextPageUrl) {
//     const res = await fetch(nextPageUrl);
//     const data: LocationResponse = await res.json();
//     const locations: Location[] = data.results;
//     allLocations = allLocations.concat(locations);
//     nextPageUrl = data.info.next;
//   }

//   return allLocations;
// };

// // Mostrar los locations
// async function showLocations() {
//   const locations = await fetchAllLocations();

//   const container = document.getElementById("containerMain");
//   container?.replaceChildren();

//   const divContainer = document.createElement("div");
//   divContainer.setAttribute("class", "container");
//   container?.appendChild(divContainer);

//   const titleLocation = document.createElement("h2");
//   titleLocation.setAttribute("class", "text-align-left");
//   divContainer.appendChild(titleLocation);
//   titleLocation.textContent = "Locations";
//   const divUlLocations = document.createElement("div");
//   divUlLocations.setAttribute("class", "overflow-auto");
//   divUlLocations.style.maxHeight = "600px";
//   divUlLocations.setAttribute("tabindex", "0");

//   divContainer.appendChild(divUlLocations);

//   const ulListOfLocations = document.createElement("ul");
//   ulListOfLocations.setAttribute("class", "list-group");
//   divUlLocations.appendChild(ulListOfLocations);

//   locations.forEach((location) => {
//     const listLocation = document.createElement("li");
//     listLocation.setAttribute("class", "list-group-item");
//     const linkLocation = document.createElement("a");
//     linkLocation.setAttribute("class", "link-item");
//     linkLocation.textContent = location.name;
//     // linkLocation.addEventListener("click", () => showLocation(location));
//     listLocation.appendChild(linkLocation);
//     ulListOfLocations.appendChild(listLocation);
//   });
// }
// // Mostrar los detalles de un location específico
// function showLocation(location: Location) {
//   const container = document.getElementById("containerMain");
//   container?.replaceChildren();

//   const locationDiv = document.createElement("div");
//   locationDiv.setAttribute("class", "location-details");
//   container?.appendChild(locationDiv);

//   const titleLocation = document.createElement("h2");
//   titleLocation.textContent = location.name;
//   locationDiv.appendChild(titleLocation);

//   const locationInfo = document.createElement("p");
//   locationInfo.textContent = `Location: ${location.type} | ${location.dimension}`;
//   locationDiv.appendChild(locationInfo);

//   const residentsContainer = document.createElement("div");
//   residentsContainer.setAttribute(
//     "class",
//     "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5"
//   );
//   locationDiv.appendChild(residentsContainer);

//   const characterPromises = location.residents.map((characterURL) => {
//     return fetch(characterURL)
//       .then((response) => response.json())
//       .catch((error) => {
//         console.error("Error fetching character data:", error);
//       });
//   });

//   Promise.all(characterPromises)
//     .then((characterDataArray) => {
//       characterDataArray.forEach((characterData) => {
//         const residentDiv = document.createElement("div");
//         residentDiv.setAttribute("class", "col");

//         const characterImage = document.createElement("img");
//         characterImage.setAttribute("src", characterData.image);
//         residentDiv.appendChild(characterImage);

//         const pName = document.createElement("p");
//         pName.textContent = `Name: ${characterData.name}`;
//         residentDiv.appendChild(pName);

//         const pStatus = document.createElement("p");
//         pStatus.textContent = `Status: ${characterData.status}`;
//         residentDiv.appendChild(pStatus);

//         const pSpecies = document.createElement("p");
//         pSpecies.textContent = `Species: ${characterData.species}`;
//         residentDiv.appendChild(pSpecies);

//         residentsContainer.appendChild(residentDiv);
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching character data:", error);
//     });
// }

// Llamar a la función showLocations cuando se hace clic en el botón

// const imgLocation = document.createElement("img");
// imgLocation.setAttribute("class", "card shadow-sm")
// imgLocation.src = element.url;
// imgLocation.setAttribute("width", "200px")
// imgLocation.setAttribute("height", "100px")
// divCardShadow?.appendChild(imgLocation);
// const cardBody = document.createElement("div")
// cardBody.setAttribute("class", "card-body")
// divCardShadow.appendChild(cardBody);
// const locationText = document.createElement("p")
// locationText.setAttribute("class", "card-text");
// locationText.textContent = element.name;
