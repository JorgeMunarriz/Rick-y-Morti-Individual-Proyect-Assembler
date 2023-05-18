var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { urlLocations } from "../utils/urlApi.js";
import { showCharacter } from "../characters/index.js";
let allLocations = [];
const fetchAllLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    let nextPageUrl = urlLocations;
    let allLocations = [];
    while (nextPageUrl) {
        const res = yield fetch(nextPageUrl);
        const data = yield res.json();
        const locations = data.results;
        allLocations = allLocations.concat(locations);
        nextPageUrl = data.info.next;
    }
    return allLocations;
});
export function getLocations() {
    const buttonShowLocations = document.getElementById("locationsBtn");
    buttonShowLocations === null || buttonShowLocations === void 0 ? void 0 : buttonShowLocations.addEventListener("click", showLocations);
    function showLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            const locations = yield fetchAllLocations();
            const container = document.getElementById("containerMain");
            container.replaceChildren();
            const divContainer = document.createElement("div");
            divContainer.setAttribute("class", "container");
            container.appendChild(divContainer);
            const titleLocation = document.createElement("h2");
            titleLocation.setAttribute("class", "text-align-left");
            divContainer.appendChild(titleLocation);
            titleLocation.textContent = "Locations";
            const divUlLocations = document.createElement("div");
            divUlLocations.setAttribute("class", "overflow-auto");
            divUlLocations.style.maxHeight = "600px";
            divUlLocations.setAttribute("tabindex", "0");
            divContainer.appendChild(divUlLocations);
            const ulListOfLocations = document.createElement("ul");
            ulListOfLocations.setAttribute("class", "list-group");
            divUlLocations.appendChild(ulListOfLocations);
            locations.forEach((location) => {
                const listLocation = document.createElement("li");
                listLocation.setAttribute("class", "list-group-item");
                const linkLocation = document.createElement("a");
                linkLocation.setAttribute("class", "link-item");
                linkLocation.textContent = location.name;
                linkLocation.addEventListener("click", () => showLocation(location));
                listLocation.appendChild(linkLocation);
                ulListOfLocations.appendChild(listLocation);
            });
        });
    }
}
function showLocation(location) {
    const container = document.getElementById("containerMain");
    container.replaceChildren();
    const locationDiv = document.createElement("div");
    locationDiv.setAttribute("class", "location-details container");
    container.appendChild(locationDiv);
    const titleLocation = document.createElement("h2");
    titleLocation.textContent = location.name;
    locationDiv.appendChild(titleLocation);
    const locationInfo = document.createElement("p");
    locationInfo.textContent = `Type: ${location.type} | Dimension: ${location.dimension}`;
    locationDiv.appendChild(locationInfo);
    const residentsContainer = document.createElement("div");
    residentsContainer.setAttribute("class", "row row-cols-1 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-5 p-2");
    locationDiv.appendChild(residentsContainer);
    const characterPromises = location.residents.map((characterURL) => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(characterURL);
            return yield response.json();
        }
        catch (error) {
            console.error("Error fetching character data:", error);
        }
    }));
    Promise.all(characterPromises)
        .then((characterDataArray) => {
        characterDataArray.forEach((characterData) => {
            const residentDiv = document.createElement("div");
            residentDiv.setAttribute("class", "col card mx-1 p-0 text-center");
            residentsContainer.appendChild(residentDiv);
            const characterImage = document.createElement("img");
            characterImage.setAttribute("class", "w-100");
            characterImage.setAttribute("src", characterData.image);
            residentDiv.appendChild(characterImage);
            const pName = document.createElement("p");
            pName.textContent = `Name: ${characterData.name}`;
            residentDiv.appendChild(pName);
            const pStatus = document.createElement("p");
            pStatus.textContent = `Status: ${characterData.status}`;
            residentDiv.appendChild(pStatus);
            const pSpecies = document.createElement("p");
            pSpecies.textContent = `Species: ${characterData.species}`;
            residentDiv.appendChild(pSpecies);
            const pOrigin = document.createElement("p");
            pOrigin.textContent = `Origin: ${characterData.location.name}`;
            residentDiv.appendChild(pOrigin);
            residentDiv.addEventListener("click", () => showCharacter(characterData.id));
        });
    })
        .catch((error) => {
        console.error("Error fetching character data:", error);
    });
}
//# sourceMappingURL=index.js.map