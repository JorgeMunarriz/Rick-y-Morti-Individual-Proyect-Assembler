 const urlCharters = 'https://rickandmortyapi.com/api/character';
 const urlLocations = 'https://rickandmortyapi.com/api/location';
 const urlEpisodes = 'https://rickandmortyapi.com/api/episodes';

 let  elementNumber = 0;
 

 fetch(urlCharters)
 .then((res) => res.json())
 .then((data) => {
    // data.forEach(element => {
    //     elementNumber++;
    //     element
        
    // });
    console.log(data)
 })
x = 1
console.log(x);
