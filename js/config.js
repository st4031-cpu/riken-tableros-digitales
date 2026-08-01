//==============================================
// SUPABASE
//==============================================

const SUPABASE_URL =
    "https://wdeuihmmbfkgzzbdwuax.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_cJYqWcp8i3_fJFczF4Juug_Yidj6pqi";

const db = supabase.createClient(

    SUPABASE_URL,

    SUPABASE_KEY

);


//==============================================
// URL DEL SISTEMA
//==============================================

// URL pública del sistema.
// Se utiliza para generar los códigos QR.

const URL_SISTEMA =
    "https://st4031-cpu.github.io/riken-tableros-digitales";