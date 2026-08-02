//==============================================
// VARIABLES
//==============================================

const correo = document.getElementById("correo");
const password = document.getElementById("password");
const btnEntrar = document.getElementById("btnEntrar");
const mensaje = document.getElementById("mensaje");


//==============================================
// INICIO
//==============================================

iniciar();

async function iniciar() {

    const { data } = await db.auth.getSession();

    if (data.session) {

        const paginaDestino =
            sessionStorage.getItem("paginaDestino");

        if (paginaDestino) {

            sessionStorage.removeItem("paginaDestino");

            window.location.href = paginaDestino;

        } else {

            window.location.href = "index.html";

        }

    }

}

btnEntrar.addEventListener("click", iniciarSesion);


//==============================================
// INICIAR SESIÓN
//==============================================

async function iniciarSesion() {

    mensaje.textContent = "";

    const email = correo.value.trim();
    const pass = password.value;

    if (email === "" || pass === "") {

        mensaje.textContent = "Completa todos los campos";

        return;

    }

    const { error } = await db.auth.signInWithPassword({

        email: email,
        password: pass

    });

    if (error) {

        mensaje.textContent = "Correo o contraseña incorrectos";

        return;

    }

    //==========================================
    // REGRESAR A LA PÁGINA QUE QUERÍA ABRIR
    //==========================================

    const paginaDestino =
        sessionStorage.getItem("paginaDestino");

    if (paginaDestino) {

        sessionStorage.removeItem("paginaDestino");

        window.location.href = paginaDestino;

    } else {

        window.location.href = "index.html";

    }

}