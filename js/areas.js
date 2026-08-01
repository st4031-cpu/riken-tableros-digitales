//==============================================
// VARIABLES
//==============================================

const txtNombre = document.getElementById("nombreArea");
const txtColor = document.getElementById("colorArea");
const btnGuardar = document.getElementById("guardarArea");
const lista = document.getElementById("listaAreas");


//==============================================
// INICIO
//==============================================

iniciar();

async function iniciar(){

    cargarAreas();

}

btnGuardar.addEventListener("click", guardarArea);


//==============================================
// GUARDAR ÁREA
//==============================================

async function guardarArea(){

    const nombre = txtNombre.value.trim();
    const color = txtColor.value;

    if(nombre===""){

        alert("Escribe el nombre del área");

        txtNombre.focus();

        return;

    }

    const {error}=await db
    .from("areas")
    .insert({

        nombre:nombre,
        color:color

    });

    if(error){

        console.error(error);

        alert("No se pudo guardar");

        return;

    }

    txtNombre.value="";

    txtColor.value="#157347";

    cargarAreas();

}
//==============================================
// CARGAR ÁREAS
//==============================================

async function cargarAreas(){

    const {data,error}=await db
    .from("areas")
    .select("*")
    .order("nombre");

    if(error){

        console.error(error);

        return;

    }

    lista.innerHTML="";

    data.forEach(area=>{

        lista.innerHTML+=`

        <div class="cardArea">

            <div
            class="color"
            style="background:${area.color}">
            </div>

            <h3>${area.nombre}</h3>

            <button onclick="abrirArea(${area.id})">
                Abrir
            </button>

        </div>

        `;

    });

}
//==============================================
// ABRIR ÁREA
//==============================================

function abrirArea(id){

    window.location.href=`tablero.html?area=${id}`;

}