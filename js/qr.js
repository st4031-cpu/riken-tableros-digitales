//==============================================
// VARIABLES
//==============================================

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const txtCodigo = document.getElementById("codigo");
const txtNombre = document.getElementById("nombre");

const qr = document.getElementById("qr");

const btnDescargar = document.getElementById("btnDescargar");
const btnImprimir = document.getElementById("btnImprimir");


//==============================================
// INICIO
//==============================================

iniciar();

async function iniciar(){

    if(!id){

        alert("No se recibió el ID del tablero.");

        return;

    }

    await cargarTablero();

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

        alert("No se pudo cargar el tablero.");

        return;

    }

    txtCodigo.textContent = data.codigo;

    txtNombre.textContent = data.nombre;

    generarQR(data);

}


//==============================================
// GENERAR QR
//==============================================

function generarQR(tablero){

    qr.innerHTML = "";

    const enlace =
        `${URL_SISTEMA}/detalle_tablero.html?id=${tablero.id}`;

    new QRCode(qr,{

        text: enlace,

        width:260,

        height:260,

        colorDark:"#000000",

        colorLight:"#ffffff",

        correctLevel:QRCode.CorrectLevel.H

    });

}


//==============================================
// DESCARGAR
//==============================================

btnDescargar.addEventListener("click",()=>{

    const img = qr.querySelector("img");

    const canvas = qr.querySelector("canvas");

    let url = "";

    if(img){

        url = img.src;

    }

    if(canvas){

        url = canvas.toDataURL("image/png");

    }

    const enlace = document.createElement("a");

    enlace.href = url;

    enlace.download = `QR_${txtCodigo.textContent}.png`;

    enlace.click();

});


//==============================================
// IMPRIMIR
//==============================================

btnImprimir.addEventListener("click",()=>{

    window.print();

});