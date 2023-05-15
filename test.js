// getEpisodes()
// .then((episodes)=> {
//   // console.log(episodes);
//   episodes.forEach((episode)=>{

  
//   const episodeNumber: number = episode.id;
//   const episodeTitle: string = episode.name
    
  
// })
// })
// .catch((error) =>{
//   console.error("Error getting the episodes ", error);
// });


//    ------list Episodes-----
// const listEpisodes = document.createElement("li");
        // listEpisodes.setAttribute("class", "dropdown-item");
        // const linkEpisodes = document.createElement("a");;
        // linkEpisodes.textContent = el.name;

// fetch(urlApi)
//   .then((res) => res.json())
//   .then((data) => {
//     data.forEach(el => {
//         elementNumber++;
//         const ulListSeasons = document.getElementById("ulListSeason");

//         const season = document.getElementById("season");
//         const listEpisodes = document.createElement("li");
//         listEpisodes.setAttribute("class", "dropdown-item");
//         const linkEpisodes = document.createElement("a");;
//         linkEpisodes.textContent = el.name;

//     });
//     console.log(data);
//   });
// seasons.forEach((season: Season) => {
    //   listSeasons.push(`ID: ${season.id}, Nombre: ${season.name}`);
    
    //   const listOfSeasons = document.createElement("li");
    //   listOfSeasons.setAttribute("class", "nav-item pe-auto");
    //   ulListSeasons?.appendChild(listOfSeasons);
    
    //   const divDropdown = document.createElement("div");
    //   divDropdown.setAttribute("class", "dropdown");
    //   listOfSeasons.appendChild(divDropdown);
    
    //   const linkSeason = document.createElement("a");
    //   linkSeason.setAttribute("class", "nav-link pe-auto d-flex align-items-center text-white text-decoration-none dropdown-toggle gap-2");
    //   linkSeason.setAttribute("data-bs-toggle", "dropdown");
    //   linkSeason.setAttribute("aria-expanded", "false");
    //   divDropdown.appendChild(linkSeason);
    
    //   const strongTitle = document.createElement("strong");
    //   strongTitle.textContent = season.name;
    //   linkSeason.appendChild(strongTitle);
    
    //   const ulListofEpisodes = document.createElement("ul");
    //   ulListofEpisodes.setAttribute("class", "dropdown-menu dropdown-menu-dark text-small shadow");
    //   ulListofEpisodes.setAttribute("id", "episodesList");
    //   divDropdown.appendChild(ulListofEpisodes);
    // });