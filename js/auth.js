//==============================================
// VERIFICAR SESIÓN
//==============================================

verificarSesion();

async function verificarSesion() {

    const { data } = await db.auth.getSession();

    if (!data.session) {

        window.location.href = "login.html";

        return;

    }

}