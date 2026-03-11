import { Loguear } from "../Services/AuthService";
import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){

    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const InicioSesion = async (e) =>{
        e.preventDefault()

        const {data,error} = await Loguear(email,password)

        if (error) {
            alert(error.message);
        }else{
            alert("Login exitoso");
            navigate('/PaginaPrincipal');
        }


    }


    return(
    <div className="font-display bg-background-dark text-slate-100 flex items-center justify-center min-h-screen p-4 relative">

        <div className="w-full max-w-[440px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
            {/*header */}
            <div className="glass-panel p-8 md:p-12 rounded-xl shadow-2xl">
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-6">
                        <span className="material-symbols-outlined text-primary text-3xl " style={{fontSize: '30px'}}>lock_open</span>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-100 mb-2">
                        Bienvenido De Vuelta
                    </h1>
                    

                </div>


                {/* Form Section */}
                <form className="space-y-6" onSubmit={InicioSesion}>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-slate-400 ml-1">
                            Correo
                            
                        </label>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors text-xl">
                                    Email
                                </span>
                            </div>

                            <input
                                className="block w-full pl-11 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                placeholder="Samuel Parra Cadavid"
                                type="text"
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold uppercase tracking-widest text-slate-400 ml-1">
                                Contraseña
                        </label>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <span className="material-symbols-outlined text-slate-500 group-focus-within:text-primary transition-colors text-xl">
                                    key
                                  </span>
                            </div>

                            <input
                                className="block w-full pl-11 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-lg text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary transition-all duration-300"
                                placeholder="••••••••"
                                type="password"
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        
                        </div>

                    </div>

                   
                    <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 px-6 rounded-lg transition-all transform active:scale-[0.98] shadow-lg shadow-primary/20 mt-4"
                        type="submit"
                        >
                            Iniciar Sesion
                    </button>

                    <div className="mt-10 text-center">
                        <p className="text-slate-500 text-sm">
                            No tienes cuenta?
                            <a className="text-primary font-medium hover:underline ml-1" href="/Register">
                                Registrate
                            </a>
                        </p>
                    </div>
                    

                </form>
            </div>
        </div>
    </div>
    );
}

export default Login;