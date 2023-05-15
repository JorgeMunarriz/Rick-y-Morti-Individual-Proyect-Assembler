var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { urlLocations } from "./utils/urlApi.js";
import { populateSeasons } from "./episodes/index.js";
import { changeThemesAdd } from "./changeThemes/index.js";
window.onload = function () {
    populateSeasons();
    changeThemesAdd();
};
let allLocations = [];
const locationBtn = document.getElementById("locationsBtn");
locationBtn === null || locationBtn === void 0 ? void 0 : locationBtn.addEventListener("click", showLocations);
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
function showLocations() {
    return __awaiter(this, void 0, void 0, function* () {
        const locations = yield fetchAllLocations();
        const container = document.getElementById("containerMain");
        container === null || container === void 0 ? void 0 : container.replaceChildren();
        const divContainer = document.createElement("div");
        divContainer.setAttribute("class", "container");
        container === null || container === void 0 ? void 0 : container.appendChild(divContainer);
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
            listLocation.appendChild(linkLocation);
            ulListOfLocations.appendChild(listLocation);
        });
    });
}
function showLocation(location) {
    const container = document.getElementById("containerMain");
    container === null || container === void 0 ? void 0 : container.replaceChildren();
    const locationDiv = document.createElement("div");
    locationDiv.setAttribute("class", "location-details");
    container === null || container === void 0 ? void 0 : container.appendChild(locationDiv);
    const titleLocation = document.createElement("h2");
    titleLocation.textContent = location.name;
    locationDiv.appendChild(titleLocation);
    const locationInfo = document.createElement("p");
    locationInfo.textContent = `Location: ${location.type} | ${location.dimension}`;
    locationDiv.appendChild(locationInfo);
    const residentsContainer = document.createElement("div");
    residentsContainer.setAttribute("class", "row row-cols-1 row-cols-sm-2 row-cols-md-3 g-5");
    locationDiv.appendChild(residentsContainer);
    const characterPromises = location.residents.map((characterURL) => {
        return fetch(characterURL)
            .then((response) => response.json())
            .catch((error) => {
            console.error("Error fetching character data:", error);
        });
    });
    Promise.all(characterPromises)
        .then((characterDataArray) => {
        characterDataArray.forEach((characterData) => {
            const residentDiv = document.createElement("div");
            residentDiv.setAttribute("class", "col");
            const characterImage = document.createElement("img");
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
            residentsContainer.appendChild(residentDiv);
        });
    })
        .catch((error) => {
        console.error("Error fetching character data:", error);
    });
}
//# sourceMappingURL=index.js.map