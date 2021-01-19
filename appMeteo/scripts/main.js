
import jourEnOrdre from './Utilitaire/gestionTemps.js';
console.log(jourEnOrdre);
const CleAPI  = '9e4058c20c7e0ce1726dc068fc351f8d';
// m1JDyoOVMKrOLvkW7OQs-vUChiIZuwVwI_sSbowkVGA
let ResulatApi;
const temps = document.querySelector('.temps');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const heure = document.querySelectorAll('.heure-nom-prevision');
const temppourH = document.querySelectorAll('.heure-prevision-valeur');
const jourDiv = document.querySelectorAll('.jour-prevision-nom');
const tempJour = document.querySelectorAll('.jour-prevision-temp');
const imgIcon = document.querySelector('.logo-meteo');
const changementContain = document.querySelector('.overlay-icone-chargement');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
       // console.log(position);
       let lon = position.coords.longitude;
       let lat = position.coords.latitude;

       AppelAPI(lon,lat);
    }, () => {
        alert('Vous avez refusé la geolocalisation , l" application ne pas fonctionner');
    } )
}
function AppelAPI(lon,lat){
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&units=metric&lang=fr&appid=${CleAPI}`)
.then((reponse) =>{
      return reponse.json();
})
.then((data) =>{
   // console.log(data);
    ResulatApi = data ;
    temps.innerText = ResulatApi.current.weather[0].description;
    temperature.innerText = `${ResulatApi.current.temp}°`
    localisation.innerText = ResulatApi.timezone

    let HeureActuelle = new Date().getHours();

    for (let i = 0; i < heure.length; i++) {
    let heureIncr = HeureActuelle + i*3;
 

    if(heureIncr > 24){
        heure[i].innerText = `${heureIncr - 24}h`;
    }else if(heureIncr === 24){
        heure[i].innerText = "00 h";
    }else{
        heure[i].innerText = `${heureIncr}h`
    }
        
    }

  // temperature pour 3h  

  for(let j = 0; j< temppourH.length; j++){
     temppourH[j].innerText = `${Math.trunc( ResulatApi.hourly[j*3].temp)}°` 
  }

 for(let k = 0; k< jourEnOrdre.length; k++){

    jourDiv[k].innerText = jourEnOrdre[k].slice(0,4);
 }

 // temperaure par jour 
for(let m= 0; m < 7 ; m++){
    tempJour[m].innerText = `${Math.trunc(ResulatApi.daily[m+1].temp.day)}°`;
}
})
// Icone dynamique

if(heure >= 6 && heure <21){
    imgIcon.src = `ressources/jour/${ResulatApi.current.weather[0].icon}.svg`;
}else{
    imgIcon.src = `ressources/nuit/${ResulatApi.current.weather[0].icon}.svg`;

}
changementContain.classList.add("disparution");
}