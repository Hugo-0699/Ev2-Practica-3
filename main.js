// JavaScript //
const nombre = document.getElementById("nombreBuscar");
const boton = document.getElementById("botonBuscar");
const pnombre = document.getElementById("nombrePersonaje");
const altura = document.getElementById("altura");
const peso = document.getElementById("peso");
const ojos = document.getElementById("colorOjos");
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
        alert("El personaje que ingresaste no existe o no fue encontrado");
        pnombre.innerText = "No encontrado :(" 
        altura.innerText = peso.innerText = ojos.innerText = cpelo.innerText = 
        fnacimiento.innerText = genero.innerText = especie.innerText = planeta.innerText = 
        vehiculo.innerText = starships.innerText = peliculas.innerText = "----";
        return;
    }


    pnombre.innerText = personaje.name;
    fnacimiento.innerText = personaje.birth_year;

    if(personaje.height.toLowerCase() !== "unknown" ){
        altura.innerText = personaje.height + " cm";
    } else {
        altura.innerText = "Desconocido";
    }
    
    if (personaje.mass.toLowerCase() !== "unknown") {
    peso.innerText = personaje.mass + " kg";
    } else {
    peso.innerText = "Desconocido";
    }

    let colorOjos = personaje.eye_color;
    for (let i = 0; i < colorOjos.length; i++) {
        colorOjos = colorOjos
        .replace("blue", "Azul")
        .replace("brown", "Café")
        .replace("green", "Verde")
        .replace("yellow", "Amarillo")
        .replace("red", "Rojo")
        .replace("black", "Negro")
        .replace("hazel", "Avellana")
        .replace("orange", "Naranja")
        .replace("gold", "Dorado")
        .replace("unknown", "Desconocido");
    }
    ojos.innerText = colorOjos;

    let colorPelo = personaje.hair_color;
    for (let i = 0; i < colorPelo.length; i++) {
        colorPelo = colorPelo
        .replace("blond", "Rubio")
        .replace("brown", "Castaño")
        .replace("black", "Negro")
        .replace("white", "Blanco")
        .replace("grey", "Gris")
        .replace("red", "Rojo")
        .replace("auburn", "Caoba")
        .replace("none", "Ninguno")
        .replace("N/A", "No aplica")
        .replace("unknown", "Desconocido");
    }
    cpelo.innerText = colorPelo;

    let generoTrad = personaje.gender;
    for (let i = 0; i < generoTrad.length; i++) {
        generoTrad = generoTrad
        .replace("male", "Masculino")
        .replace("female", "Femenino")
        .replace("hermaphrodite", "Hermafrodita")
        .replace("N/A", "No aplica")
        .replace("unknown", "Desconocido");
    }
    genero.innerText = generoTrad;

    // Al traer todos los datos de la API, estos ultimos elementos llegan con un URL,
    // por lo que tocará traerlos con los datos correspondientes.
    planeta.innerText = personaje.homeworld;
    especie.innerText = personaje.species;
    vehiculo.innerText = personaje.vehicles;
    starships.innerText = personaje.starships
    peliculas.innerText = personaje.films;

    const planetaResp = await fetch(personaje.homeworld);
    const infoPlaneta = await planetaResp.json();
    planeta.innerText = infoPlaneta.name;

    if (personaje.species.length > 0) {
        const espResp = await fetch(personaje.species[0]);
        const infoEsp = await espResp.json();
        especie.innerText = infoEsp.name;
    } else {
        especie.innerText = "Humano (no especificado)";
    }
    
    // Aplicaremos lo mismo que lo anterior pero también los traduciremos.
    // (la API no tiene implementado un sistema que ya tenga los datos traducidos, por lo que tocará
    // hacerlo manualmente con diccionarios)
    const tradVehiculos = {
        "Sand Crawler": "Rastreador de arena",
        "Speeder bike": "Motos voladoras",
        "T-16 skyhopper": "Saltador T-16",
        "X-34 landspeeder": "Deslizador terrestre X-34",
        "Snowspeeder": "Deslizador de nieve",
        "Imperial Speeder Bike": "Bicicleta deslizadora imperial"
    };
    vehiculo.innerText = "";
    for (const url of personaje.vehicles) {
        const vehResp = await fetch(url);
        const infoVeh = await vehResp.json();
        const nombreTrad = tradVehiculos[infoVeh.name] || infoVeh.name;
        const li = document.createElement("li");
        li.innerText = nombreTrad;
        vehiculo.appendChild(li);
    }

    const tradStarships = {
        "Death Star": "Estrella de la Muerte",
        "Millennium Falcon": "Halcón Milenario",
        "X-wing": "Caza X",
        "TIE Advanced x1": "TIE Avanzado x1",
        "Imperial shuttle": "Lanzadera imperial"
    };
    starships.innerText = "";
    for (const url of personaje.starships) {
        const starResp = await fetch(url);
        const infoStar = await starResp.json();
        const nombreTrad = tradStarships[infoStar.name] || infoStar.name;
        const li = document.createElement("li");
        li.innerText = nombreTrad;
        starships.appendChild(li);
    }

    peliculas.innerHTML = "";
    const tradPeliculas = {
        "A New Hope": "Una nueva esperanza",
        "The Empire Strikes Back": "El Imperio contraataca",
        "Return of the Jedi": "El retorno del Jedi",
        "The Phantom Menace": "La amenaza fantasma",
        "Attack of the Clones": "El ataque de los clones",
        "Revenge of the Sith": "La venganza de los Sith",
        "The Force Awakens": "El despertar de la Fuerza"
    };

    for (const url of personaje.films) {
        const filmResp = await fetch(url);
        const infoFilm = await filmResp.json();
        const elementoPelicula = document.createElement("li");
        const tituloTraducido = tradPeliculas[infoFilm.title] || infoFilm.title;
        elementoPelicula.innerText = tituloTraducido;
        peliculas.appendChild(elementoPelicula);
    }
}

botonBuscar.addEventListener("click", e => {
    e.preventDefault();
    buscarPersonajes();
});