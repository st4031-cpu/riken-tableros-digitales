//==============================================
// VARIABLES
//==============================================

const params = new URLSearchParams(window.location.search);

const idArea = params.get("area");

const titulo = document.getElementById("nombreArea");

const txtCodigo = document.getElementById("codigo");
const txtNombre = document.getElementById("nombre");

const btnGuardar = document.getElementById("guardar");

const lista = document.getElementById("listaTableros");


//==============================================
// INICIO
//==============================================

iniciar();


async function iniciar(){

    await cargarArea();

    await cargarTableros();

    btnGuardar.addEventListener(
        "click",
        guardarTablero
    );

}



//==============================================
// CARGAR ÁREA
//==============================================

async function cargarArea(){

    const { data, error } = await db
    .from("areas")
    .select("*")
    .eq("id", idArea)
    .single();


    if(error){

        console.error(error);

        return;

    }


    titulo.textContent = data.nombre;

}



//==============================================
// GUARDAR TABLERO
//==============================================

async function guardarTablero(){

    const codigo = txtCodigo.value.trim();

    const nombre = txtNombre.value.trim();


    if(codigo === "" || nombre === ""){

        alert("Completa todos los campos");

        return;

    }



    const { data: area } = await db
    .from("areas")
    .select("*")
    .eq("id", idArea)
    .single();



    const { error } = await db
    .from("tableros")
    .insert({

        codigo: codigo,

        nombre: nombre,

        area: area.nombre,

        color_area: area.color,

        foto_url: ""

    });



    if(error){

        console.error(error);

        alert("No se pudo guardar");

        return;

    }



    alert("Tablero guardado correctamente");


    txtCodigo.value = "";

    txtNombre.value = "";


    await cargarTableros();

}



//==============================================
// CARGAR TABLEROS
//==============================================

async function cargarTableros(){


    const { data: area } = await db
    .from("areas")
    .select("*")
    .eq("id", idArea)
    .single();



    if(!area){

        return;

    }



    const { data, error } = await db
    .from("tableros")
    .select("*")
    .eq("area", area.nombre)
    .order("codigo");



    if(error){

        console.error(error);

        return;

    }



    lista.innerHTML = "";



    data.forEach(tablero=>{


        lista.innerHTML += `


        <div class="cardTablero">


            <div

            class="color"

            style="
            background:${tablero.color_area || '#157347'}
            ">

            </div>



            ${
                tablero.foto_url

                ?

                `

                <img

                class="fotoTablero"

                src="${tablero.foto_url}"

                alt="Imagen del tablero">

                `

                :

                `

                <div class="sinFoto">

                    Sin imagen disponible

                </div>

                `

            }



            <h3>

            ${tablero.codigo}

            </h3>



            <p>

            ${tablero.nombre}

            </p>



            <button onclick="abrirTablero(${tablero.id})">

                Abrir

            </button>



        </div>


        `;


    });


}



//==============================================
// ABRIR TABLERO
//==============================================

function abrirTablero(id){

    window.location.href =

    `detalle_tablero.html?id=${id}`;

}