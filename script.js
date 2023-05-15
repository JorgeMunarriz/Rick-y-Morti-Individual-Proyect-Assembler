


const urlApi = "https://rickandmortyapi.com/api";
const urlCharacters = `${urlApi}/character`;
const urlLocations = `${urlApi}/localition`;
const urlEpisodes = `${urlApi}/episode`;


interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

  interface Season {
    id: number;
    name: string;
  }
  
  const seasons: Season[] = [
    { id: 1, name: "Season 1" },
    { id: 2, name: "Season 2" },
    { id: 3, name: "Season 3" },
    { id: 4, name: "Season 4" },
    { id: 5, name: "Season 5" },
    { id: 6, name: "Season 6" }
  ];
  
  // Create season`s list with forEach
  const listSeasons: string[] = [];
  seasons.forEach((season: Season) => {
    listSeasons.push(`ID: ${season.id}, Nombre: ${season.name}`);
    const ulListSeasons = document.getElementById("ulListSeason");
    const listOfSeasons = document.createElement("li");
    listOfSeasons.setAttribute("class", "nav-item pe-auto")
    ulListSeasons?.appendChild(listOfSeasons);
    const divDropdown = document.createElement("div");
    divDropdown.setAttribute("class", "dropdown")
    ulListSeasons?.appendChild(divDropdown);
    const linkSeason = document.createElement("a");
    linkSeason.setAttribute("class", "nav-link pe-auto d-flex align-items-center text-white text-decoration-none dropdown-toggle gap-2");
    linkSeason.setAttribute("data-bs-toggle", "dropdown");
    linkSeason.setAttribute("aria-expanded", "false");
    divDropdown.appendChild(linkSeason);
    const strongTitle = document.createElement("strong");
    strongTitle.textContent = season.name;
    linkSeason.appendChild(strongTitle);

    const ulListofEpisodes = document.createElement("ul")
    ulListofEpisodes.setAttribute("class", "dropdown-menu dropdown-menu-dark text-small shadow");
    ulListofEpisodes.setAttribute("id", "episodesList")
    divDropdown.appendChild(ulListofEpisodes);
    
    const getEpisodes = async (): Promise<Episode[]> =>{
      
      const res = await fetch(urlEpisodes);
      const data = await res.json();
      const episodes: Episode[] = data.results.map((episodeData: any) => {
        return {
          id: episodeData.id,
          name: episodeData.name,
          air_date: episodeData.air_date,
          episode: episodeData.episode,
          characters: episodeData.characters
        };
      });
      return episodes;
    };
    getEpisodes()
    .then((episodes)=> {
      // console.log(episodes);
      episodes.forEach((episode)=>{

      
      const episodeNumber: number = episode.id;
        console.log(episodeNumber)
      const episodeLi = document.createElement("li")
      episodeLi.setAttribute("class", "dropdown-item")
      episodeLi.setAttribute("data-elementnumber", episodeNumber.toString());
      episodeLi.textContent = `Episode ${episodeNumber}`
      ulListofEpisodes.appendChild(episodeLi)
    })
    })
    .catch((error) =>{
      console.error("Error getting the episodes ", error);
    });
    





        
        
  });
  
  console.log(listSeasons);
  
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
let x = 1;
console.log(x);
fetch(urlLocations)
  .then((res) => res.json())
  .then((data) => {
    // data.forEach(element => {
    //     elementNumber++;
    //     element

    // });
    console.log(data);
  });

  const listOfEpisodes = document.getElementById("listOfEpisodes");
  if(listOfEpisodes){
  const getEpisodes = async (): Promise<Episode[]> =>{
      
    const res = await fetch(urlEpisodes);
    const data = await res.json();
    const episodes: Episode[] = data.results.map((episodeData: any) => {
      return {
        id: episodeData.id,
        name: episodeData.name,
        air_date: episodeData.air_date,
        episode: episodeData.episode,
        characters: episodeData.characters
      };
    });
    return episodes;
  };
  
  
  getEpisodes()
  .then((episodes)=> {
    console.log(episodes);
    
    episodes.forEach((episode)=>{
    
    
    
    const episodeNumber: number = episode.id;
      console.log(episodeNumber)
    const episodeLi = document.createElement("li")
    episodeLi.setAttribute("class", "dropdown-item")
    episodeLi.setAttribute("data-elementnumber", episodeNumber.toString());
    listOfEpisodes.appendChild(episodeLi)
    const linkEpisode = document.createElement("a");
    linkEpisode.setAttribute("class", "nav-link d-flex align-items-center text-black text-decoration-none gap-2");
    linkEpisode.setAttribute("data-bs-toggle", "dropdown");
    linkEpisode.setAttribute("aria-expanded", "false");
    episodeLi.appendChild(linkEpisode);
    linkEpisode.textContent = `Episode ${episodeNumber}`;
    episodeLi.appendChild(linkEpisode)
    
    
  })
  })
  .catch((error) =>{
    console.error("Error getting the episodes ", error);
  });
}

