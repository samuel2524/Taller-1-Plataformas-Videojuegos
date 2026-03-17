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

        console.log("JUEGOS TRANSFORMADOS:", juegosTransformados);

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

    console.log(data)
    
    return {data}
    
  } catch (error) {
    console.error("Error en en traer juego: ", error)
    return null;
  }
  
}
