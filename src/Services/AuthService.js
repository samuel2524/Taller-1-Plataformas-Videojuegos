import { supabase } from "../lib/supaBaseCliente";

export async function Registrar(email,password,nombre){ 

    let { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                nombre: nombre //Agregar atributo extra en supabase
            }
        }
    });

    return {data,error}

}

export async function Loguear(email,password) {
    let { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    return {data,error}
}

export async function Logout() {
    let { error } = await supabase.auth.signOut()
    return {error};
}


