//==============================================
// VARIABLES
//==============================================

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const titulo = document.getElementById("titulo");
const area = document.getElementById("area");

const codigo = document.getElementById("codigo");
const nombre = document.getElementById("nombre");
const ubicacion = document.getElementById("ubicacion");
const voltaje = document.getElementById("voltaje");
const fabricante = document.getElementById("fabricante");
const responsable = document.getElementById("responsable");
const descripcion = document.getElementById("descripcion");
const observaciones = document.getElementById("observaciones");

const manual_url = document.getElementById("manual_url");
const layout_url = document.getElementById("layout_url");
const diagrama_url = document.getElementById("diagrama_url");

const foto = document.getElementById("foto");
const vistaFoto = document.getElementById("vistaFoto");

const btnGuardar = document.getElementById("guardar");

let fotoActual = "";


//==============================================
// INICIO
//==============================================

iniciar();

async function iniciar(){

    await cargarTablero();

    foto.addEventListener("change", mostrarVistaPrevia);

    btnGuardar.addEventListener("click", guardarCambios);

}


//==============================================
// CARGAR TABLERO
//==============================================

async function cargarTablero(){

    const { data, error } = await db
        .from("tableros")
        .select("*")
        .eq("id", id)
        .single();

    if(error){

        console.error(error);

        alert("No se pudo cargar el tablero");

        return;

    }

    titulo.textContent = data.nombre;

    area.textContent = data.area;

    codigo.value = data.codigo || "";
    nombre.value = data.nombre || "";
    ubicacion.value = data.ubicacion || "";
    voltaje.value = data.voltaje || "";
    fabricante.value = data.fabricante || "";
    responsable.value = data.responsable || "";
    descripcion.value = data.descripcion || "";
    observaciones.value = data.observaciones || "";

    manual_url.value = data.manual_url || "";
    layout_url.value = data.layout_url || "";
    diagrama_url.value = data.diagrama_url || "";

    fotoActual = data.foto_url || "";

    if(fotoActual){

        vistaFoto.src = fotoActual;

        vistaFoto.style.display = "block";

    }

}


//==============================================
// VISTA PREVIA DE LA FOTO
//==============================================

function mostrarVistaPrevia(){

    if(!foto.files.length){

        return;

    }

    const lector = new FileReader();

    lector.onload = function(e){

        vistaFoto.src = e.target.result;

        vistaFoto.style.display = "block";

    }

    lector.readAsDataURL(foto.files[0]);

}
//==============================================
// SUBIR FOTO A SUPABASE
//==============================================

async function subirFoto(){

    if(!foto.files.length){

        return fotoActual;

    }

    const archivo = foto.files[0];

    const extension = archivo.name.split(".").pop();

    const nombreArchivo = `tablero_${id}.${extension}`;

    const { error } = await db.storage
        .from("fotos")
        .upload(nombreArchivo, archivo, {

            upsert:true

        });

    if(error){

        console.error(error);

        alert("No se pudo subir la fotografía");

        return fotoActual;

    }

    const { data } = db.storage
        .from("fotos")
        .getPublicUrl(nombreArchivo);

    return data.publicUrl;

}


//==============================================
// GUARDAR CAMBIOS
//==============================================

async function guardarCambios(){

    let fotoURL = await subirFoto();

    const { error } = await db
        .from("tableros")
        .update({

            codigo: codigo.value.trim(),

            nombre: nombre.value.trim(),

            ubicacion: ubicacion.value.trim(),

            voltaje: voltaje.value.trim(),

            fabricante: fabricante.value.trim(),

            responsable: responsable.value.trim(),

            descripcion: descripcion.value.trim(),

            observaciones: observaciones.value.trim(),

            manual_url: manual_url.value.trim(),

            layout_url: layout_url.value.trim(),

            diagrama_url: diagrama_url.value.trim(),

            foto_url: fotoURL

        })
        .eq("id", id);

    if(error){

        console.error(error);

        alert("No se pudieron guardar los cambios");

        return;

    }

    alert("Cambios guardados correctamente");

    window.location.href = `detalle_tablero.html?id=${id}`;

}