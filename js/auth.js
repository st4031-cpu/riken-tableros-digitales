//==============================================
// VERIFICAR SESIÓN
//==============================================

verificarSesion();

async function verificarSesion() {

    const { data } = await db.auth.getSession();

    if (!data.session) {

        //======================================
        // GUARDAR LA PÁGINA QUE EL USUARIO
        // QUERÍA ABRIR
        //======================================

        sessionStorage.setItem(

            "paginaDestino",

            window.location.href

        );

        //======================================
        // IR AL LOGIN
        //======================================

        window.location.href = "login.html";

        return;

    }

}