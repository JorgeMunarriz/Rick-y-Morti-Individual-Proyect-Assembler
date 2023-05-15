export {getLocations} 
const urlLocations = "https://rickandmortyapi.com/api/location";
interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: string[];
    url: string;
    created: string;
  }
  
  interface LocationResponse {
    info: {
      count: number;
      pages: number;
      next: string | null;
      prev: string | null;
    };
    results: Location[];
  }
  
  let allLocations: Location[] = [];
  
  const locationBtn = document.getElementById("locationsBtn")
  locationBtn?.addEventListener("click", getLocations)
  function getLocations(){
    let x = 4;
    console.log(x)
    const container = document.getElementById("containerMain");
    container?.replaceChildren()
  
  
  fetch(urlLocations)
    .then((res) => res.json())
    .then((data: LocationResponse) => {
      data.results.forEach((element) => {
        const locationId: number = element.id;
        
        const container2 = document.getElementById("container2");
        const divContainer = document.createElement("div");
        divContainer.setAttribute("class", "container")
        container2?.appendChild(divContainer);
        const divRow = document.createElement("div");
        divRow.setAttribute("class", "row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3")
        divContainer?.appendChild(divRow);
        const divCol = document.createElement("div");
        divCol.setAttribute("class", "col")
        divRow?.appendChild(divCol);
        const divCardShadow = document.createElement("div");
        divCardShadow.setAttribute("class", "card shadow-sm")
        divCol?.appendChild(divCardShadow);
        const imgLocation = document.createElement("img");
        imgLocation.setAttribute("class", "card shadow-sm")
        imgLocation.src = element.url;
        imgLocation.setAttribute("width", "200px")
        imgLocation.setAttribute("height", "100px")
        divCardShadow?.appendChild(imgLocation);
        const cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")
        divCardShadow.appendChild(cardBody);
        const locationText = document.createElement("p")
        locationText.setAttribute("class", "card-text");
        locationText.textContent = element.name;
  
  
  
  
  
      });
      console.log(data);
    });
  }
  //   const listOfEpisodes = document.getElementById("listOfEpisodes");
  //   if(listOfEpisodes){
  //   const getEpisodes = async (): Promise<Episode[]> =>{
        
  //     const res = await fetch(urlEpisodes);
  //     const data = await res.json();
  //     const episodes: Episode[] = data.results.map((episodeData: any) => {
  //       return {
  //         id: episodeData.id,
  //         name: episodeData.name,
  //         air_date: episodeData.air_date,
  //         episode: episodeData.episode,
  //         characters: episodeData.characters
  //       };
  //     });
  //     return episodes;
  //   };
    
    
  //   getEpisodes()
  //   .then((episodes)=> {
      
      
  //     episodes.forEach((episode)=>{    
  //     const episodeNumber = episode.name;      
  //     const episodeLi = document.createElement("li")
  //     episodeLi.setAttribute("class", "dropdown-item")
  //     episodeLi.setAttribute("data-elementnumber", episodeNumber.toString());
  //     listOfEpisodes.appendChild(episodeLi)
  //     const linkEpisode = document.createElement("a");
  //     linkEpisode.setAttribute("class", "nav-link d-flex align-items-center text-black text-decoration-none gap-2");
  //     linkEpisode.setAttribute("data-bs-toggle", "dropdown");
  //     linkEpisode.setAttribute("aria-expanded", "false");
  //     episodeLi.appendChild(linkEpisode);
  //     linkEpisode.textContent = `${episodeNumber}`;
  //     episodeLi.appendChild(linkEpisode)
      
      
  //   })
  //   })
  //   .catch((error) =>{
  //     console.error("Error getting the episodes ", error);
  //   });
  // }
  