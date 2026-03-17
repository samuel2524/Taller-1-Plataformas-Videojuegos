import { useState } from "react";
import { CrearJuego } from "../../Services/VideoJuegoService";

function ModalCrearJuego({ onClose }){



    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [plataformas, setPlataformas] = useState("")
    const [genero, setGenero] = useState("")


    
    const CrearJuegoCrud = async(e) =>{
        e.preventDefault()
        const {data,error} = await CrearJuego(nombre,descripcion,plataformas,genero)

        

        if (error) {
            console.log("hubo un error creando el juego")
            alert("error")
        }else{
            alert("Creacion de juego exitoso")
            window.location.reload()
        }
    }



    return(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
          
        >
          <div
            className="relative w-full max-w-3xl rounded-[2rem] border border-white/10 bg-gradient-to-b from-zinc-900 to-background-dark p-8"
           
          >
            <button
              className="absolute right-4 top-4 h-11 w-11 rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20"
              onClick={onClose}
            >
              ×
            </button>
                <div className="space-y-4">
                    <h3 className="mt-4 text-4xl font-black tracking-tight">Crear Juego</h3>
                    <form className="space-y-6" onSubmit={CrearJuegoCrud}>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400 ml-1">
                                Nombre
                                
                            </label>

                            <div className="relative group">
                                <input
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                    type="text"
                                    onChange={(e)=> setNombre(e.target.value)}
                                />
                            
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400 ml-1">
                                    Descripcion
                            </label>

                            <div className="relative group">
                                <input
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                    type="text"
                                    onChange={(e)=> setDescripcion(e.target.value)}
                                />
                            
                            </div>

                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400 ml-1">
                                    Plataformas
                            </label>

                            <div className="relative group">
                                <input
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                    type="text"
                                    onChange={(e)=> setPlataformas(e.target.value)}
                                />
                            
                            </div>

                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase tracking-widest text-slate-400 ml-1">
                                    Genero
                            </label>

                            <div className="relative group">
                                <input
                                    className="block w-full pl-11 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                    type="text"
                                    onChange={(e)=> setGenero(e.target.value)}
                                />
                            
                            </div>

                        </div>


                    
                        <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 px-6 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 mt-4"
                            type="submit"
                            >
                                Crear Juego
                        </button>
                        

                    </form>
                </div>
          
              </div>
            </div>
        
    );
}

export default ModalCrearJuego;