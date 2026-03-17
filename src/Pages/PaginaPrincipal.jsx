import { supabase } from "../lib/supaBaseCliente";
// import tailwindcss from "@tailwindcss/vite";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "../Services/AuthService";
import { obtenerJuegos } from "../Services/VideoJuegoService";
import { GuardarJuegosEnBd } from "../Services/VideoJuegoService";

function Principal(){
    
    const navigate = useNavigate()
    const [nombre,setNombre] = useState("")
    // const [cargando, setCargando] = useState(true)

    const UserLogout = async() =>{
        const {error} = await Logout()
        navigate ('/Login')

    }

    const cargarJuegos = async () => {
        console.log("ME DIERON CLICK");
        const juegos = await obtenerJuegos();
        console.log(juegos );
        await GuardarJuegosEnBd(juegos);
    };


    //reac muestra la pagina y luego ejecuta esta funcion, al ser una peticion async debe ir dentro del useEffect
    useEffect (()=>{
        
        const obtenerUsuario = async ()=> {
            
            const {data} = await supabase.auth.getSession(); //obtenemos el session donde esta el token para saber que usuario esta dentro y no cualquier persona usando la ruta pueda entrar a esta vista

            if(!data.session){
                navigate('/Login')
                return;
            }
            

            setNombre(data.session.user.user_metadata.nombre || "Usuario");
            // setCargando(false);
        }

        obtenerUsuario();
    },[navigate]) // para que no salga una advertencia, ya que react dice que todas las dependencias que usemos en useEffect tiene que ir dentro del array

    // if(cargando){
    //     return null;
    // }
    
   
    return(

        <div className="bg-amber-50 text-black">  
            <h1>Has iniciado Sesion {nombre} </h1>
            <div>
                <button onClick={UserLogout}>logout</button>
                
            </div>
            <div>
                <button type="button" className="bg-amber-300" onClick={cargarJuegos}>cargar a la bd</button>
            </div>
            
        </div>
      
   
        
    );
}

export default Principal;