import { logIn } from "./utils/signIn.js";
import { webPageSearchEngine } from "./utils/urlApi.js";
import { createSeasonsList, createEpisodesNavBarList, } from "./episodes/index.js";
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
    webPageSearchEngine();
};
//# sourceMappingURL=index.js.map