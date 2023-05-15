export { getLocations };
const urlLocations = "https://rickandmortyapi.com/api/location";
let allLocations = [];
const locationBtn = document.getElementById("locationsBtn");
locationBtn === null || locationBtn === void 0 ? void 0 : locationBtn.addEventListener("click", getLocations);
function getLocations() {
    let x = 4;
    console.log(x);
    const container = document.getElementById("containerMain");
    container === null || container === void 0 ? void 0 : container.replaceChildren();
    fetch(urlLocations)
        .then((res) => res.json())
        .then((data) => {
        data.results.forEach((element) => {
            const locationId = element.id;
            const container2 = document.getElementById("container2");
            const divContainer = document.createElement("div");
            divContainer.setAttribute("class", "container");
            container2 === null || container2 === void 0 ? void 0 : container2.appendChild(divContainer);
            const divRow = document.createElement("div");
            divRow.setAttribute("class", "row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3");
            divContainer === null || divContainer === void 0 ? void 0 : divContainer.appendChild(divRow);
            const divCol = document.createElement("div");
            divCol.setAttribute("class", "col");
            divRow === null || divRow === void 0 ? void 0 : divRow.appendChild(divCol);
            const divCardShadow = document.createElement("div");
            divCardShadow.setAttribute("class", "card shadow-sm");
            divCol === null || divCol === void 0 ? void 0 : divCol.appendChild(divCardShadow);
            const imgLocation = document.createElement("img");
            imgLocation.setAttribute("class", "card shadow-sm");
            imgLocation.src = element.url;
            imgLocation.setAttribute("width", "200px");
            imgLocation.setAttribute("height", "100px");
            divCardShadow === null || divCardShadow === void 0 ? void 0 : divCardShadow.appendChild(imgLocation);
            const cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");
            divCardShadow.appendChild(cardBody);
            const locationText = document.createElement("p");
            locationText.setAttribute("class", "card-text");
            locationText.textContent = element.name;
        });
        console.log(data);
    });
}
//# sourceMappingURL=index.js.map