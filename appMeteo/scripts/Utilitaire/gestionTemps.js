const jourSemaine = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

let ajd = new Date();
let options = {weekDays : 'long'};
let jourActuel = ajd.toLocaleDateString('fr-FR',options);

//console.log(ajd,jourActuel)

let jourEnOrdre = jourSemaine.slice(jourSemaine.indexOf(jourActuel)).concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuel)));
//console.log(jourEnOrdre)

export default jourEnOrdre;