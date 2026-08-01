//==============================================
// CARGAR HEADER
//==============================================

async function cargarHeader() {

    const contenedor = document.getElementById("header");

    if (!contenedor) return;

    const respuesta = await fetch("componentes/header.html");

    const html = await respuesta.text();

    contenedor.innerHTML = html;

    //==========================================
    // USUARIO
    //==========================================

    const { data } = await db.auth.getUser();

    if (data.user) {

        document.getElementById("usuarioActual").textContent =
            data.user.email;

    }

    //==========================================
    // CERRAR SESIÓN
    //==========================================

    document
        .getElementById("cerrarSesion")
        .addEventListener("click", async () => {

            await db.auth.signOut();

            window.location.href = "login.html";

        });

}

cargarHeader();