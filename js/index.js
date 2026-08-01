// ================================
// INICIO
// ================================

iniciar();

async function iniciar() {

    cargarTotales();

    eventos();

}



// ================================
// EVENTOS
// ================================

function eventos() {

    document
        .getElementById("btnAreas")
        .addEventListener("click", () => {

            window.location.href = "areas.html";

        });

}



// ================================
// CARGAR TOTALES
// ================================

async function cargarTotales() {

    // Total de áreas
    const { count: totalAreas } = await db
        .from("areas")
        .select("*", { count: "exact", head: true });

    // Total de tableros
    const { count: totalTableros } = await db
        .from("tableros")
        .select("*", { count: "exact", head: true });

    document.getElementById("totalAreas").textContent =
        totalAreas || 0;

    document.getElementById("totalTableros").textContent =
        totalTableros || 0;

}