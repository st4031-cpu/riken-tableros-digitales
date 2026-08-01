//==============================================
// SUPABASE
//==============================================

const SUPABASE_URL = "https://wdeuihmmbfkgzzbdwuax.supabase.co";

const SUPABASE_KEY = "sb_publishable_cJYqWcp8i3_fJFczF4Juug_Yidj6pqi";

const db = supabase.createClient(

    SUPABASE_URL,

    SUPABASE_KEY

);


//==============================================
// URL DEL SISTEMA
//==============================================

// Mientras desarrollas usa automáticamente
// la dirección desde donde abriste la página.
// Cuando publiques el sistema solo cambia
// esta línea por tu dominio.

const URL_SISTEMA = window.location.origin;

// Ejemplo cuando publiques:
//
// const URL_SISTEMA = "https://tableros.riken.com";
//
// o
//
// const URL_SISTEMA = "https://tableros.riken.com.mx";