// Codigo de JavaScript //
const boton = document.getElementById("botonBuscar");
const nombre = document.getElementById("nombreBuscar");

const pnombre = document.getElementById("nombrePersonaje");
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");
const cpelo = document.getElementById("colorPelo");
const fnacimiento = document.getElementById("fechaNacimiento");
const genero = document.getElementById("genero");
const especie = document.getElementById("especie");
const planeta = document.getElementById("planeta");
const vehiculo = document.getElementById("vehiculo");
const starships = document.getElementById("starships")
const peliculas = document.getElementById("peliculas");

async function buscarPersonajes (){
    const respuesta = await fetch("https://swapi.dev/api/people/?search=" + nombre.value)
    const info = await respuesta.json();
    const personaje = info.results[0];

    if (!personaje) {
        pnombre.innerText = "x No encontrado x";
        altura.innerText = peso.innerText = cpelo.innerText = fnacimiento.innerText = 
        genero.innerText = especie.innerText = planeta.innerText = vehiculo.innerText = 
        starships.innerText = peliculas.innerText = "";
        return;
    }

    pnombre.innerText = personaje.name;
    altura.innerText = personaje.height;
    peso.innerText = personaje.mass;
    cpelo.innerText = personaje.hair_color;
    fnacimiento.innerText = personaje.birth_year;
    genero.innerText = personaje.gender;
    especie.innerText = personaje.species;
    planeta.innerText = personaje.homeworld;
    vehiculo.innerText = personaje.vehicles;
    starships.innerText = personaje.starships
    peliculas.innerText = personaje.films;

    /* 
    Al traer todos los datos, estos de aqui abajo llegan con un URL 
    (que alentrar te llevan a un string, osea que en esta API no hay imgs solo texto), 
    por lo que tocará traerlos con los datos correspondientes.
    */

    // Planeta
    const planetaResp = await fetch(personaje.homeworld);
    const infoPlaneta = await planetaResp.json();
    planeta.innerText = infoPlaneta.name;

    // Especies
    if (personaje.species.length > 0) {
        const espResp = await fetch(personaje.species[0]);
        const infoEsp = await espResp.json();
        especie.innerText = infoEsp.name;
    } else {
        especie.innerText = "Humano (no especificado)";
    }

    // Películas
    peliculas.innerText = "";
    for (const url of personaje.films) {
        const filmResp = await fetch(url);
        const infoFilm = await filmResp.json();
        peliculas.innerText += infoFilm.title + ", ";
    }

    // Naves
    starships.innerText = "";
    for (const url of personaje.starships) {
        const starResp = await fetch(url);
        const infoStar = await starResp.json();
        starships.innerText += infoStar.name + ", ";
    }

    // Vehículos
    vehiculo.innerText = "";
    for (const url of personaje.vehicles) {
        const vehResp = await fetch(url);
        const infoVeh = await vehResp.json();
        vehiculo.innerText += infoVeh.name + ", ";
    }
}

botonBuscar.addEventListener("click", e => {
    e.preventDefault();
    buscarPersonajes();
});