let pag = document.querySelector("#personajes")
let divPaginacion = document.querySelector("#paginacion")
let tipos = '';
let arreglo = [];
let contadorTipos = 1;
let stringTipo = '';

let disabled_prev = '';
let disabled_next = '';

let url;
let api;

function crearTarjetas (dpersonajes){
    if (dpersonajes.previous === null){
        disabled_prev = 'disabled';
    } else {
        disabled_prev = '';
    }

    if (dpersonajes.next === null){
        disabled_next = 'disabled';
    } else {
        disabled_next = '';
    }

    for (const tpersonajes of dpersonajes.results) {
    
        let datapok = fetch(tpersonajes.url)
        let nombre1 = '';
        let nombre2 = '';

        datapok.then( res_data => res_data.json())
        .then(infopoke => {
            // console.log(infopoke);
            nombre1 = infopoke.name;
            nombre2 = nombre1.charAt(0).toUpperCase() + nombre1.slice(1);
            console.log(nombre2);
            
            
            for (const tipopoke of infopoke.types){
                arreglo.push(tipopoke.type.name);
            }

            // console.log(arreglo);

            pag.innerHTML += `
            <div class="col-lg-3 col-md-4 col-6">
                <div class="card align-items-center">
                    <figure class="hover-img w-100 card-img-top">
                        <img src="${infopoke.sprites.front_default}">
                        <figcaption>
                            <h3>Base Exp:${infopoke.base_experience}</h3>
                        </figcaption>
                    </figure>
                    <div class="card-body">
                        <h5 class="card-title">${nombre2}</h5>
                        <p class="mt-2 fw-bold text-center">Type(s):</p>
                        <div id="tipo${contadorTipos}"></div>
                    </div>
                </div>
            </div>
            `
            stringTipo = "tipo" + contadorTipos.toString();
            tipos = document.getElementById(stringTipo);
            console.log(tipos);
            for (let i = 0; i < arreglo.length; i++){
                let tipoMayus = arreglo[i].charAt(0).toUpperCase() + arreglo[i].slice(1);
                tipos.innerHTML += `
                <p class="text-center my-0">${tipoMayus}</p>`
            }
            arreglo = [];
            contadorTipos++;
        })
    }
}

function limpiar(){
    pag.innerHTML = '';
}

function consumo_api(nuevaUrl = 0){

if (nuevaUrl === 0){

    url = "https://pokeapi.co/api/v2/pokemon/"
    api = fetch(url);

}   else {
    url = nuevaUrl;
    api = fetch(url);
}
    api.then(res_api => res_api.json())
        .then(dpersonajes => {
            // console.log(dpersonajes);
            limpiar();
            crearTarjetas(dpersonajes);

            divPaginacion.innerHTML = `
            <button class="btn btn-dark mt-5" ${disabled_prev} onclick='consumo_api("${dpersonajes.previous}")' id='boton_prev'>Prev</button>
            <button class="btn btn-dark mt-5 ms-2" ${disabled_next} onclick='consumo_api("${dpersonajes.next}")' id='boton_next'>Next</button>
            `

        }).catch(error => { console.log(error) })
}

consumo_api(0);

