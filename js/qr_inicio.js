//==============================================
// URL DEL SISTEMA
//==============================================


const URL_SISTEMA =

"https://st4031-cpu.github.io/riken-tableros-digitales/";




//==============================================
// GENERAR QR
//==============================================


const qr = document.getElementById("qr");


new QRCode(qr,{


    text:URL_SISTEMA,


    width:280,


    height:280,


    correctLevel:QRCode.CorrectLevel.H


});




//==============================================
// DESCARGAR QR
//==============================================


const boton = document.getElementById("descargar");


boton.addEventListener("click",()=>{


    const imagen = qr.querySelector("img");


    const enlace = document.createElement("a");


    enlace.href = imagen.src;


    enlace.download = "QR_RIKEN_Sistema.png";


    enlace.click();


});