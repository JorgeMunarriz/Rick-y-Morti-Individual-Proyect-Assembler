console.log("errorr");
import { searchElements } from "./utils/urlApi.js";
import { createSeasonsList, createEpisodesNavBarList, } from "./episodes/index.js";
import { changeThemesAdd } from "./changeThemes/index.js";
import { showLocations } from "./Locations/index.js";
import { getCharacters } from "./characters/index.js";
console.log("errorr");
window.onload = function () {
    changeThemesAdd();
    createSeasonsList();
    getCharacters();
    createEpisodesNavBarList();
    const buttonShowLocations = document.getElementById("locationsBtn");
    buttonShowLocations === null || buttonShowLocations === void 0 ? void 0 : buttonShowLocations.addEventListener("click", showLocations);
    const buttonSearchNames = document.getElementById("searchBtn");
    buttonSearchNames === null || buttonSearchNames === void 0 ? void 0 : buttonSearchNames.addEventListener("click", () => {
        const searchTerm = document.getElementById("inputSearch").value;
        searchElements(searchTerm);
    });
};
//# sourceMappingURL=index.js.map