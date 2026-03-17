import { data } from "react-router-dom";
import { supabase } from "../lib/supaBaseCliente";

const Base_Url = "https://api.rawg.io/api/games";
const RawgKey = import.meta.env.VITE_RAWG_KEY


export async function obtenerJuegos() {
  try {
    let juegosTotales = [];
    let page = 1;

    while (juegosTotales.length < 100) {
      const url = `${Base_Url}?key=${RawgKey}&page=${page}&page_size=40`;
      const response = await fetch(url); //peticion http get con la api 

      const data = await response.json(); //convierto en json la peticion

      if (!data.results || data.results.length === 0) {
        break;
      }

      juegosTotales = [...juegosTotales, ...data.results]; // Juegostotales = juegostotales + data-results
      page++;
      
    }

    const juegosFinales = juegosTotales.slice(0, 100);
    console.log("TOTAL JUEGOS:", juegosFinales.length);

    return juegosFinales;
  } catch (error) {
    console.error("Error en obtenerJuegos:", error);
    return [];
  }
}

export async function GuardarJuegosEnBd(juegos) {

    try {
        // convertimos los datos de nuestra api en formato de nuestra tabla
        const juegosTransformados = juegos.map((juego) =>({
            id: juego.id,
            nombre: juego.name,
            imagen: juego.background_image,
            descripcion: juego.slug,
            plataformas: juego.platforms
            ? juego.platforms.map((p) => p.platform.name).join(", ")
            : "",
            Genero: juego.genres
            ? juego.genres.map((g) => g.name).join(", ") // aqui cogemos todos los generos que  nos manda la api separados por una coma
            : ""
        
        }))


       const {data, error} = await supabase
        .from("Videojuegos")
        .insert(juegosTransformados);

        if (error) {
            console.error("ERROR REAL DE SUPABASE:", error);
            throw new Error("Error en Guardar juegos en Bd");
            
        }

        console.log("Juegos guardados:", data);
        return data;


    } catch (error) {
        console.error("Error en Conectar: ", error)
        return null;
    }
    
}


export async function LeerVideojuegos() {

  try {
    let { data, error } = await supabase
      .from('Videojuegos')
      .select('*')
    
    return {data}
    
  } catch (error) {
    console.error("Error en en traer juego: ", error)
    return null;
  }
  
}

export async function CrearJuego(Nombre,descripcion,plataformas,genero) {

  try {

  const { data, error } = await supabase
      .from("Videojuegos")
      .insert([
        {
          nombre: Nombre,
          descripcion: descripcion,
          plataformas: plataformas,
          Genero: genero,
          imagen: ""
        },
      ])
      .select();

      console.log(data)
      console.log(error)

      return {data};
    
  } catch (error) {
    console.error("Error en CrearJuego ", error)
  }
  
}

export async function EditarJuego(id, datos) {
  try {
    const { data, error } = await supabase
      .from("Videojuegos")
      .update(datos)
      .eq("id", id);

    return { data, error };
  } catch (error) {
    console.error("Error editando juego:", error);
  }

}


export async function EliminarJuego(id) {
  try {
    const { error } = await supabase
      .from("Videojuegos")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error eliminando juego:", error);
      return { ok: false, error };
    }

    return { ok: true, error: null };
  } catch (error) {
    console.error("Error en EliminarJuego:", error);
    return { ok: false, error };
  }
}
