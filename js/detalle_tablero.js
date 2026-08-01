//==============================================
// VARIABLES
//==============================================

const URL_BASE =
    "https://st4031-cpu.github.io/riken-tableros-digitales";

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

const contenedorQR = document.getElementById("qr");
const btnDescargarQR = document.getElementById("btnDescargarQR");


//==============================================
// INICIO
//==============================================

iniciar();

async function iniciar() {

    if (!id) {

        console.error("No se recibió el ID.");

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

    console.log(data);

    if (error) {

        console.error(error);

        return;

    }

    //==========================================
    // DATOS
    //==========================================

    if (area)
        area.textContent = data.area || "-";

    codigo.textContent = data.codigo || "-";
    nombre.textContent = data.nombre || "-";
    ubicacion.textContent = data.ubicacion || "-";
    voltaje.textContent = data.voltaje || "-";
    fabricante.textContent = data.fabricante || "-";
    responsable.textContent = data.responsable || "-";
    descripcion.textContent = data.descripcion || "-";
    observaciones.textContent = data.observaciones || "-";


    //==========================================
    // FOTOGRAFÍA
    //==========================================

    galeria.innerHTML = "";

    if (data.foto_url && data.foto_url.trim() !== "") {

        galeria.innerHTML = `
            <img
                src="${data.foto_url}"
                alt="Fotografía del tablero">
        `;

    } else {

        galeria.innerHTML =
            "<p>No hay fotografías disponibles.</p>";

    }


    //==========================================
    // DOCUMENTOS
    //==========================================

    configurarDocumento(btnManual, data.manual_url);
    configurarDocumento(btnLayout, data.layout_url);
    configurarDocumento(btnDiagrama, data.diagrama_url);


    //==========================================
    // GENERAR QR
    //==========================================

    if (contenedorQR) {

        contenedorQR.innerHTML = "";

        const enlaceQR =
            `${URL_BASE}/detalle_tablero.html?id=${id}`;

        new QRCode(contenedorQR, {

            text: enlaceQR,

            width: 250,

            height: 250,

            colorDark: "#000000",

            colorLight: "#ffffff",

            correctLevel: QRCode.CorrectLevel.H

        });

    }


    //==========================================
    // DESCARGAR QR
    //==========================================

    if (btnDescargarQR) {

        btnDescargarQR.onclick = function () {

            const img =
                contenedorQR.querySelector("img");

            const canvas =
                contenedorQR.querySelector("canvas");

            let urlImagen = "";

            if (img) {

                urlImagen = img.src;

            }

            if (canvas) {

                urlImagen = canvas.toDataURL("image/png");

            }

            const enlace =
                document.createElement("a");

            enlace.href = urlImagen;

            enlace.download =
                `${data.codigo}_QR.png`;

            enlace.click();

        };

    }

}


//==============================================
// CONFIGURAR DOCUMENTOS
//==============================================

function configurarDocumento(boton, url) {

    if (!boton)
        return;

    if (url && url.trim() !== "") {

        boton.href = url;

        boton.target = "_blank";

    }

    else {

        boton.style.display = "none";

    }

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

        window.location.href =
            `editar_tablero.html?id=${id}`;

    });

}