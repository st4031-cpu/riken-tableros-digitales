//==============================================
// VARIABLES
//==============================================

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

console.log("ID recibido:", id);

const area = document.getElementById("area");

const codigo = document.getElementById("codigo");
const nombre = document.getElementById("nombre");
const ubicacion = document.getElementById("ubicacion");
const voltaje = document.getElementById("voltaje");
const fabricante = document.getElementById("fabricante");
const responsable = document.getElementById("responsable");
const descripcion = document.getElementById("descripcion");
const observaciones = document.getElementById("observaciones");

const galeria = document.getElementById("galeria");

const btnManual = document.getElementById("btnManual");
const btnLayout = document.getElementById("btnLayout");
const btnDiagrama = document.getElementById("btnDiagrama");

const btnEditar = document.getElementById("btnEditar");
const btnRegresar = document.getElementById("btnRegresar");

const qr = document.getElementById("qr");
const btnDescargarQR = document.getElementById("btnDescargarQR");


//==============================================
// INICIO
//==============================================

iniciar();

async function iniciar() {

    if (!id) {

        console.error("No se recibió el ID del tablero.");

        return;

    }

    await cargarTablero();

}


//==============================================
// CARGAR TABLERO
//==============================================

async function cargarTablero() {

    const { data, error } = await db
        .from("tableros")
        .select("*")
        .eq("id", id)
        .single();

    console.log("TABLERO:", data);

    if (error) {

        console.error(error);

        return;

    }

    //==============================================
    // DATOS
    //==============================================

    area.textContent = data.area || "-";
    codigo.textContent = data.codigo || "-";
    nombre.textContent = data.nombre || "-";
    ubicacion.textContent = data.ubicacion || "-";
    voltaje.textContent = data.voltaje || "-";
    fabricante.textContent = data.fabricante || "-";
    responsable.textContent = data.responsable || "-";
    descripcion.textContent = data.descripcion || "-";
    observaciones.textContent = data.observaciones || "-";



    //==============================================
    // FOTOGRAFÍA
    //==============================================

    galeria.innerHTML = "";

    if (data.foto_url && data.foto_url.trim() !== "") {

        galeria.innerHTML = `
            <img
                src="${data.foto_url}"
                alt="Fotografía del tablero">
        `;

    } else {

        galeria.innerHTML = "<p>No hay fotografías disponibles.</p>";

    }



    //==============================================
    // DOCUMENTOS
    //==============================================

    if (data.manual_url && data.manual_url.trim() !== "") {

        btnManual.href = data.manual_url;

    } else {

        btnManual.style.display = "none";

    }

    if (data.layout_url && data.layout_url.trim() !== "") {

        btnLayout.href = data.layout_url;

    } else {

        btnLayout.style.display = "none";

    }

    if (data.diagrama_url && data.diagrama_url.trim() !== "") {

        btnDiagrama.href = data.diagrama_url;

    } else {

        btnDiagrama.style.display = "none";

    }



    //==============================================
    // GENERAR QR
    //==============================================

    generarQR();

}



//==============================================
// GENERAR QR
//==============================================

function generarQR() {

    if (!qr) return;

    qr.innerHTML = "";

    const enlace = `${URL_SISTEMA}/detalle_tablero.html?id=${id}`;

    new QRCode(qr, {

        text: enlace,

        width: 220,

        height: 220,

        colorDark: "#000000",

        colorLight: "#ffffff",

        correctLevel: QRCode.CorrectLevel.H

    });

}



//==============================================
// DESCARGAR QR
//==============================================

if (btnDescargarQR) {

    btnDescargarQR.addEventListener("click", () => {

        const img = qr.querySelector("img");

        if (!img) {

            alert("Todavía no se ha generado el QR.");

            return;

        }

        const enlace = document.createElement("a");

        enlace.href = img.src;

        enlace.download = `QR_${id}.png`;

        enlace.click();

    });

}



//==============================================
// BOTÓN REGRESAR
//==============================================

if (btnRegresar) {

    btnRegresar.addEventListener("click", () => {

        history.back();

    });

}



//==============================================
// BOTÓN EDITAR
//==============================================

if (btnEditar) {

    btnEditar.addEventListener("click", () => {

        window.location.href = `editar_tablero.html?id=${id}`;

    });

}