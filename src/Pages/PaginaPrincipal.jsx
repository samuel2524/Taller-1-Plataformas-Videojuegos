import { supabase } from "../lib/supaBaseCliente";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Logout } from "../Services/AuthService";
import { LeerVideojuegos } from "../Services/VideoJuegoService";
import ModalGame from "../Components/Modals/ModalGame";
import ModalCrearJuego from "../Components/Modals/ModalCrearJuego";


    const generosBase = [
        { key: "Action", titulo: "Acción", descripcion: "Combate, velocidad y mundos con presencia." },
        { key: "Rpg", titulo: "RPG", descripcion: "Progresión, exploración y sistemas con profundidad." },
        { key: "Adventure", titulo: "Aventura", descripcion: "Historias, exploración y descubrimiento." },
        { key: "Sports", titulo: "Deportes", descripcion: "Competencia, reflejos y adrenalina." },
        { key: "Shooter", titulo: "Shooter", descripcion: "Precisión, estrategia y ritmo." },
        { key: "Indie", titulo: "Indie", descripcion: "Decisiones, control y planificación." },
    ];

    
    function buildTags(value, fallback) {
    const source = value || fallback;
    return source
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 3);
    }

    function formatPlatforms(value) {
    return buildTags(value, "PC").map((item) => item.toUpperCase());
    }

    function getGamesByGenre(juegos, genero) {
        return juegos.filter((juego) =>
            (juego.Genero || "").toLowerCase().includes(genero.toLowerCase())
        );
    }      

function Principal(){
    
    const [busqueda, setBusqueda] = useState("");
    const navigate = useNavigate()
    const [nombre,setNombre] = useState("")
    const [juegos, setJuegos] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [verificandoSesion, setVerificandoSesion] = useState(true);
    const [cargandoJuegos, setCargandoJuegos] = useState(false);
    const [mostrarModalCrearJuego, setMostrarModalCrearJuego] = useState(false);


    const UserLogout = async() =>{
        const {error} = await Logout()
        navigate ('/Login')

    }



        
    //reac muestra la pagina y luego ejecuta esta funcion, al ser una peticion async debe ir dentro del useEffect
    useEffect(() => {
        const cargarPagina = async () => {
            const { data } = await supabase.auth.getSession();

            if (!data.session) {
            navigate("/Login");
            return;
            }

            setNombre(data.session.user.user_metadata.nombre || "Usuario");

            const response = await LeerVideojuegos();
            setJuegos(response.data || []);

            setVerificandoSesion(false);
        };

        cargarPagina();
    }, [navigate]);

    const juegosFiltrados = useMemo(() => {
        const term = busqueda.trim().toLowerCase();
    
        if (!term) {
          return juegos;
        }
    
        return juegos.filter((juego) =>
          `${juego.nombre} ${juego.Genero} ${juego.descripcion}`
            .toLowerCase()
            .includes(term)
        );
    }, [busqueda, juegos]);
    
   const juegoDestacado = juegosFiltrados.length > 0 
  ? juegosFiltrados[0] 
  : null;

    
    const seccionesGenero = useMemo(() => {
        return generosBase.map((genero) => ({
            ...genero,
            juegos: getGamesByGenre(juegosFiltrados, genero.key),
        }));
    }, [juegosFiltrados]);



    
    if (verificandoSesion) {
        return (
          <main className="flex min-h-screen items-center justify-center bg-[#090604] px-6 text-[#f4ede1]">
            <div className="w-full max-w-md rounded-[28px] border border-[#2c221b] bg-[#140f0c] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cab394]">
                Zona Gamer
              </span>
              <h1 className="mt-4 text-3xl font-light tracking-tight">
                Cargando panel
              </h1>
            </div>
          </main>
        );
    }
    
    

    // const navItems = [{ label: "Home", href: "/paginaprincipal", ac  tive: true }];
    return(
    <main className="min-h-screen bg-[#090604] text-[#f3eadf]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(120,73,33,0.22),transparent_18%),radial-gradient(circle_at_85%_30%,rgba(85,53,28,0.18),transparent_20%),linear-gradient(180deg,#100a07_0%,#090604_38%,#070403_100%)]" />

      <header className="border-b border-[#1d1510] bg-[#0d0907]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[780px] items-center justify-between gap-6 px-5 py-3 md:max-w-[820px] lg:max-w-[980px]">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#ebddca]">
              <span className="text-[#d3bd9a]">◓</span>
              <span>ZONA GAMER</span>
            </div>

            <nav className="flex items-center gap-4 text-sm text-[#bba890]">
              <a
                href="#home"
                className="relative pb-3 text-[#f2e9dc] after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-[#d9bf97] after:content-['']"
              >
                Home
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden items-center rounded-2xl border border-[#2a211a] bg-[#17110d] px-4 py-2.5 text-sm text-[#8f7a67] md:flex">
              <span className="mr-2 text-xs">⌕</span>
              <input
                value={busqueda}
                onChange={(event) => setBusqueda(event.target.value)}
                placeholder="Search games..."
                className="w-36 bg-transparent text-[#f0e4d4] outline-none placeholder:text-[#7e6a58]"
              />
            </div>

            <button
              type="button"
              onClick={() => setMostrarModalCrearJuego(true)}
              className="rounded-2xl bg-[#ead3ac] px-4 py-2.5 text-sm font-semibold text-[#241710] transition hover:bg-[#f2dfbf] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {cargandoJuegos ? "Loading..." : "+ Create Game"}
            </button>

            <span className="hidden text-xs uppercase tracking-[0.16em] text-[#9d866f] md:inline">
              {nombre}
            </span>

            <button
              type="button"
              onClick={UserLogout}
              className="text-[10px] uppercase tracking-[0.16em] text-[#8d7762] transition hover:text-[#f0e4d4]"
            >
              Logout
            </button>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d5bc92] text-xs font-semibold text-[#241710]">
              {nombre.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <section
        id="home"
        className="mx-auto max-w-[780px] px-5 pb-6 pt-5 md:max-w-[820px] lg:max-w-[980px]"
      >
        <div className="grid w-full ap-3 lg:grid-cols-[1.05fr_0.95fr]">
        {juegoDestacado && (
          <article className="rounded-[24px] w-full border border-[#2c221c] bg-[linear-gradient(180deg,#2b1f18_0%,#17110e_100%)] p-5 shadow-[0_22px_60px_rgba(0,0,0,0.28)]"
           style={{
            backgroundImage: `url(${juegoDestacado.imagen})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
          >
            <span className="inline-flex rounded-full border border-[#534234] bg-[#3a2c23] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#d8c4a7]">
              Featured release
            </span>

            <h1 className="mt-4 text-[56px] font-light leading-[0.92] tracking-[-0.05em] text-[#f5efe6] md:text-[68px]">
              {juegoDestacado.nombre}
            </h1>

            <p className="mt-4 max-w-xl text-[15px] leading-8 text-[#bfae99]">
              {juegoDestacado.descripcion}
            </p>


            <div className="mt-7">
              <button
                type="button"
                className="rounded-2xl border border-[#3d3026] bg-[#2a211b] px-5 py-3 text-sm font-semibold text-[#f0e4d4] transition hover:bg-[#322720]"
              >
                Explore Catalog →
              </button>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-[16px] border border-[#2f241d] bg-[#1c1511] p-4">
                <p className="text-[28px] font-semibold text-[#f6efe4]">
                  {juegos.length || 128}
                </p>
                <p className="mt-1 text-xs text-[#8f7c69]">Catalog titles</p>
              </div>
              <div className="rounded-[16px] border border-[#2f241d] bg-[#1c1511] p-4">
                <p className="text-[28px] font-semibold text-[#f6efe4]">
                  {new Set(juegos.flatMap((juego) => buildTags(juego.Genero, ""))).size ||
                    32}
                </p>
                <p className="mt-1 text-xs text-[#8f7c69]">Genres indexed</p>
              </div>
              <div className="rounded-[16px] border border-[#2f241d] bg-[#1c1511] p-4">
                <p className="text-[28px] font-semibold text-[#f6efe4]">4.9</p>
                <p className="mt-1 text-xs text-[#8f7c69]">Average rating</p>
              </div>
            </div>
          </article>

          )}

        
        </div>


        {seccionesGenero.map((seccion) => (
            <section key={seccion.key} className="mt-8">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-[36px] font-light tracking-tight text-[#f4ece0]">
                        {seccion.titulo}
                        </h2>
                        <p className="mt-1 text-[15px] text-[#a18c78]">
                        {seccion.descripcion}
                        </p>
                    </div>

                    <div className="flex gap-3 pt-1">
                        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2f241d] bg-[#130f0d] text-[#ddc8a8]">
                        ←
                        </button>
                        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2f241d] bg-[#130f0d] text-[#ddc8a8]">
                        →
                        </button>
                    </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {seccion.juegos.length > 0 ? (
                        seccion.juegos.map((game, index) => (
                        <button
                            key={game.id || index}
                            type="button"
                            onClick={() => setSelectedGame(game)}
                            style={{
                                backgroundImage: `url(${game.imagen})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                            className="min-h-[320px] rounded-[26px] border border-[#3a2d23] bg-[#1a1410] p-4 text-left transition hover:-translate-y-0.5"
                        >
                            <div className="flex h-full flex-col justify-end">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#d3bea2]">
                                    {game.descripcion}
                                </p>
                                <h3 className="mt-2 text-[20px] font-medium text-[#f4ece0]">
                                    {game.nombre}
                                </h3>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {formatPlatforms(game.plataformas).slice(0, 2).map((platform) => (
                                    <span
                                        key={platform}
                                        className="rounded-md border border-[#3b2d24] bg-[#1a1410]/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-[#ceb89b]"
                                    >
                                        {platform}
                                    </span>
                                    ))}
                                </div>
                            </div>
                        </button>
                        ))
                    ) : (
                        <p className="text-sm text-[#8f7c69]">
                        No hay juegos para este género.
                        </p>
                    )}
                </div>
            </section>
            ))}

        <footer className="mt-12 rounded-[24px] border border-[#241b15] bg-[#110d0b] px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#eadfce]">
                <span className="text-[#d2bb9a]">◓</span>
                <span>ZONA GAMER</span>
              </div>
              <p className="mt-2 text-[14px] text-[#aa957f]">
                Interfaz base preparada para reemplazar mocks por datos de RAWG.
              </p>
            </div>

            <p className="text-[14px] text-[#b9a18a]">
              © 2026 Zona Gamer. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </section>

      {selectedGame ? (
        <ModalGame
          selectedGame={selectedGame}
          setSelectedGame={setSelectedGame}
        />
      ) : null}

      {mostrarModalCrearJuego && (
        <ModalCrearJuego onClose={() => setMostrarModalCrearJuego(false)} />
    )}
    </main>

    
        
    );
}

export default Principal;