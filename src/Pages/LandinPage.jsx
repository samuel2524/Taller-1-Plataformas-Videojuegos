import { LibraryBig } from "lucide-react";
import { useState } from "react";
import accion from "../assets/accion.jpg";
import multijugador from "../assets/multijugador.jpg";
import rpg from "../assets/rpg.jpg";
import sandbox from "../assets/sandbox.jpg";
import shooter from "../assets/shooter.jpg";
import LandingGameCard from "../Components/Cards/LandingGameCard";
import ModalLandingGame from "../Components/Modals/ModalLandingGame";

const featuredGames = [
  {
    id: "gta-sa",
    nombre: "Grand Theft Auto: San Andreas",
    Genero: "Accion",
    descripcion: "Accion y crimen en una California marcada por pandillas, ritmo urbano y mundo abierto.",
    plataformas: "PC, PlayStation 2, Xbox, iOS, Android",
    imagen: accion,
  },
  {
    id: "little-nightmares",
    nombre: "Little Nightmares",
    Genero: "Aventura",
    descripcion: "Un viaje oscuro de puzzles, sigilo y tension dentro de espacios deformes y opresivos.",
    plataformas: "PC, PlayStation 4, Xbox One, Switch",
    imagen: sandbox,
  },
  {
    id: "deus-ex",
    nombre: "Deus Ex: Mankind Divided",
    Genero: "RPG",
    descripcion: "RPG de accion cyberpunk con sigilo, decisiones y combate en un futuro fracturado.",
    plataformas: "PC, PlayStation 4, Xbox One, Linux",
    imagen: rpg,
  },
  {
    id: "prey",
    nombre: "Prey",
    Genero: "Shooter",
    descripcion: "Ciencia ficcion, exploracion y supervivencia en una estacion espacial invadida.",
    plataformas: "PC, PlayStation 4, Xbox One",
    imagen: shooter,
  },
  {
    id: "it-takes-two",
    nombre: "It Takes Two",
    Genero: "Multijugador",
    descripcion: "Cooperativo creativo donde cada nivel cambia reglas, ritmo y mecanicas para dos jugadores.",
    plataformas: "PC, PlayStation 5, Xbox Series X|S, Switch",
    imagen: multijugador,
  },
  {
    id: "elden-ring",
    nombre: "Elden Ring",
    Genero: "RPG",
    descripcion: "Exploracion libre, fantasia oscura y combates exigentes en un mundo enorme e interconectado.",
    plataformas: "PC, PlayStation 5, Xbox Series X|S",
    imagen: rpg,
  },
  {
    id: "forza-horizon",
    nombre: "Forza Horizon 5",
    Genero: "Deportes",
    descripcion: "Velocidad arcade, mapa vibrante y una atmosfera festiva centrada en el automovilismo.",
    plataformas: "PC, Xbox Series X|S, Xbox One",
    imagen: accion,
  },
  {
    id: "valheim",
    nombre: "Valheim",
    Genero: "Sandbox",
    descripcion: "Supervivencia cooperativa con construccion, exploracion y progresion en biomas nordicos.",
    plataformas: "PC, Xbox Series X|S",
    imagen: sandbox,
  },
  {
    id: "helldivers-2",
    nombre: "Helldivers 2",
    Genero: "Shooter",
    descripcion: "Accion cooperativa intensa, fuego cruzado caotico y objetivos dinamicos a gran escala.",
    plataformas: "PC, PlayStation 5",
    imagen: shooter,
  },
];

const categories = [
  { name: "Accion", image: accion },
  { name: "Aventura", image: sandbox },
  { name: "RPG", image: rpg },
  { name: "Deportes", image: accion },
  { name: "Sandbox", image: sandbox },
  { name: "Multijugador", image: multijugador },
  { name: "Shooter", image: shooter },
  { name: "Estrategia", image: rpg },
];

function LandingPage() {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#080504] text-[#f4ece0]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_14%_18%,rgba(155,91,43,0.22),transparent_18%),radial-gradient(circle_at_84%_16%,rgba(234,211,172,0.09),transparent_15%),radial-gradient(circle_at_50%_110%,rgba(77,47,24,0.35),transparent_28%)]" />

      <header className="sticky top-0 z-40 border-b border-[#1d1510] bg-[#0d0907]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-6 py-4 xl:px-5">
          <div className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#eadfce]">
            <span className="text-[#d3bd9a]">◓</span>
            <span>Zona Gamer</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-[#bba890] md:flex">
            <a href="#inicio" className="transition hover:text-[#f2dfbf]">Inicio</a>
            <a href="#categorias" className="transition hover:text-[#f2dfbf]">Categorias</a>
            <a href="#destacados" className="transition hover:text-[#f2dfbf]">Destacados</a>
            <a href="#proyecto" className="transition hover:text-[#f2dfbf]">Proyecto</a>
          </nav>
        </div>
      </header>

      <section
        id="inicio"
        className="mx-auto max-w-[1240px] px-6 pb-10 pt-10 md:px-8 lg:pt-12 xl:px-5"
      >
        <div className="grid items-center gap-8 xl:grid-cols-[minmax(0,1.02fr)_minmax(380px,0.98fr)]">
          <div className="max-w-[820px]">
            <span className="app-pill w-fit">Landing del proyecto</span>

            <h1 className="app-title mt-6 max-w-[12.5ch] text-[clamp(3.2rem,6vw,6.4rem)] leading-[0.9] tracking-[-0.06em]">
              Una sola identidad visual para explorar, descubrir y administrar videojuegos.
            </h1>

            <p className="app-copy mt-5 max-w-[690px] text-[15px] leading-8 md:text-[16px]">
              Una experiencia visual sobria y moderna para presentar el universo del proyecto,
              sus categorias principales y una entrada clara al panel de gestion.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#destacados" className="app-button-primary">Explorar juegos</a>
              <a href="/Login" className="app-button-secondary">Iniciar sesion</a>
              <a href="/Register" className="app-button-secondary">Registrate</a>
            </div>
          </div>

          <article
            aria-hidden="true"
            className="app-panel relative hidden h-[420px] overflow-hidden xl:block 2xl:h-[470px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(23,16,12,0.96)_0%,rgba(13,9,7,0.9)_58%,rgba(24,17,13,0.94)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_28%,rgba(234,211,172,0.08),transparent_24%),radial-gradient(circle_at_72%_72%,rgba(155,91,43,0.14),transparent_30%),radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03),transparent_42%)]" />
            <div className="absolute inset-[8%] rounded-[34px] border border-[#ffffff0e] bg-[linear-gradient(180deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.008)_100%)] backdrop-blur-[3px]" />
            <div className="absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.14)_0%,rgba(234,211,172,0.08)_34%,rgba(249,115,22,0.03)_58%,transparent_76%)] blur-[88px]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-[74%] w-[74%] items-center justify-center rounded-[36px] border border-[#ffffff0c] bg-[linear-gradient(180deg,rgba(255,255,255,0.018)_0%,rgba(255,255,255,0.005)_100%)] backdrop-blur-sm">
                <div className="absolute inset-[12%] rounded-[30px] border border-[#ffffff08]" />
                <div className="absolute left-1/2 top-1/2 z-0 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.12)_0%,rgba(249,115,22,0.04)_44%,transparent_74%)] blur-[72px]" />
                <LibraryBig
                  className="relative z-10 h-[220px] w-[220px] text-white/10 2xl:h-[260px] 2xl:w-[260px]"
                  strokeWidth={1.15}
                />
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-8 xl:px-5">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <div className="app-panel-soft p-5">
            <span className="app-kicker">Vista</span>
            <strong className="mt-3 block text-3xl font-semibold text-[#f4ece0]">Publica</strong>
            <span className="mt-2 block text-sm leading-6 text-[#aa957f]">
              Sin consultas a la base de datos.
            </span>
          </div>
          <div className="app-panel-soft p-5">
            <span className="app-kicker">Acceso</span>
            <strong className="mt-3 block text-3xl font-semibold text-[#f4ece0]">CRUD</strong>
            <span className="mt-2 block text-sm leading-6 text-[#aa957f]">
              Disponible solo tras autenticacion.
            </span>
          </div>
          <div className="app-panel-soft p-5">
            <span className="app-kicker">Muestra</span>
            <strong className="mt-3 block text-3xl font-semibold text-[#f4ece0]">9</strong>
            <span className="mt-2 block text-sm leading-6 text-[#aa957f]">
              Juegos manuales en portada.
            </span>
          </div>
          <div className="app-panel-soft p-5">
            <span className="app-kicker">Publico</span>
            <p className="mt-3 text-lg font-medium leading-8 text-[#f4ece0]">
              Showcase manual para presentar el proyecto.
            </p>
          </div>
          <div className="app-panel-soft p-5">
            <span className="app-kicker">Privado</span>
            <p className="mt-3 text-lg font-medium leading-8 text-[#f4ece0]">
              Panel autenticado para consultar y administrar.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-6 pb-8 xl:px-5">
        <article className="app-panel relative overflow-hidden p-7 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(234,211,172,0.16),transparent_20%),radial-gradient(circle_at_bottom_left,rgba(155,91,43,0.18),transparent_24%),linear-gradient(180deg,rgba(34,23,16,0.22)_0%,transparent_45%),linear-gradient(135deg,rgba(49,33,22,0.38)_0%,transparent_55%)]" />
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="app-kicker">Arquitectura del proyecto</span>
              <span className="app-pill">Publica + Privada</span>
            </div>

            <h2 className="app-title mt-5 max-w-[420px] text-[38px] leading-tight md:text-[54px]">
              Videojuegos
            </h2>
            <p className="app-copy mt-4 max-w-[520px] text-[15px] leading-8">
              La portada presenta una muestra curada. El panel privado concentra
              la lectura real de datos y la administracion del catalogo.
            </p>

            <div className="mt-7 grid gap-3">
              <div className="grid gap-3 xl:grid-cols-[0.85fr_1.15fr]">
                <div className="rounded-[28px] border border-[#ffffff14] bg-[#120d0ad1] p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="app-kicker">Landing</span>
                      <strong className="mt-3 block text-[32px] font-medium leading-none text-[#f4ece0]">
                        Publica
                      </strong>
                    </div>
                    <span className="app-pill">Visual</span>
                  </div>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-[#c9b49d]">
                    Muestra visual y seleccion manual de juegos para presentar el proyecto.
                  </p>
                </div>

                <div className="rounded-[28px] border border-[#ffffff14] bg-[#17110ddc] p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="app-kicker">Panel</span>
                      <strong className="mt-3 block text-[32px] font-medium leading-none text-[#f4ece0]">
                        Privado
                      </strong>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="app-pill">Autenticado</span>
                      <span className="app-pill">CRUD</span>
                    </div>
                  </div>

                  <p className="mt-4 max-w-md text-sm leading-7 text-[#c9b49d]">
                    Lectura real de juegos, filtros, busqueda y administracion solo con sesion iniciada.
                  </p>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-[22px] border border-[#ffffff12] bg-[#0f0a08a8] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
                    Contenido
                  </p>
                  <p className="mt-3 text-base font-medium leading-7 text-[#f4ece0]">
                    Curado, ligero y sin permisos sensibles.
                  </p>
                </div>
                <div className="rounded-[22px] border border-[#ffffff12] bg-[#0f0a08a8] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
                    Acceso
                  </p>
                  <p className="mt-3 text-base font-medium leading-7 text-[#f4ece0]">
                    Solo usuarios autenticados consultan la base real.
                  </p>
                </div>
                <div className="rounded-[22px] border border-[#ffffff12] bg-[#0f0a08a8] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
                    Seguridad
                  </p>
                  <p className="mt-3 text-base font-medium leading-7 text-[#f4ece0]">
                    La tabla juegos no tiene lectura publica desde la landing.
                  </p>
                </div>
              </div>

              <div className="mt-2 rounded-[24px] border border-[#ffffff12] bg-[#0f0a08a8] px-6 py-5 backdrop-blur-sm">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
                  Propuesta
                </p>
                <p className="mt-3 max-w-[620px] text-base leading-8 text-[#f4ece0]">
                  Separar la presentacion publica del catalogo real autenticado para
                  no exponer la tabla juegos ni depender de permisos abiertos en Supabase.
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section
        id="categorias"
        className="mx-auto max-w-[1240px] px-6 pb-16 pt-6 xl:px-5"
      >
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <span className="app-kicker">Categorias</span>
          <h3 className="app-title mt-3 text-4xl md:text-5xl">Explora distintos estilos de juego</h3>
          <p className="app-copy mt-3 text-[16px] leading-8">
            La parte publica presenta el universo del proyecto sin depender del backend.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <article
              key={category.name}
              className="group relative min-h-[220px] overflow-hidden rounded-[28px] border border-[#3a2d23] transition duration-500 hover:-translate-y-1 hover:border-[#5b4434]"
            >
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,6,4,0.2)_0%,rgba(9,6,4,0.75)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(9,6,4,0.15)_0%,rgba(9,6,4,0.7)_100%)]" />
              <div className="relative flex h-full items-end p-6">
                <span className="text-3xl font-medium tracking-tight text-[#f4ece0]">
                  {category.name}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="destacados" className="mx-auto max-w-[1240px] px-6 py-16 xl:px-5">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <span className="app-kicker">Destacados</span>
          <h3 className="app-title mt-4 text-4xl md:text-5xl">Videojuegos principales</h3>
          <p className="app-copy mt-4 text-[16px] leading-8">
            Seleccion manual para la muestra publica. El catalogo completo queda dentro del panel autenticado.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredGames.map((juego) => (
            <LandingGameCard key={juego.id} game={juego} onSelect={setSelectedGame} />
          ))}
        </div>
      </section>

      <section id="proyecto" className="mx-auto max-w-[1240px] px-6 pb-24 pt-8 xl:px-5">
        <div className="app-panel grid gap-8 p-8 xl:grid-cols-2">
          <div>
            <span className="app-kicker">Proyecto</span>
            <h3 className="app-title mt-4 text-4xl md:text-5xl">Base visual del taller</h3>
            <p className="app-copy mt-5 max-w-2xl text-[16px] leading-8">
              Una base visual consistente para la parte publica, la autenticacion y el panel principal del proyecto.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="app-panel-soft p-5">
              <strong className="block text-lg font-medium text-[#f4ece0]">Pagina publica</strong>
              <span className="mt-2 block text-sm leading-6 text-[#aa957f]">
                Muestra visual sin permisos sensibles.
              </span>
            </div>
            <div className="app-panel-soft p-5">
              <strong className="block text-lg font-medium text-[#f4ece0]">Autenticacion</strong>
              <span className="mt-2 block text-sm leading-6 text-[#aa957f]">
                Entrada necesaria para operar la base real.
              </span>
            </div>
            <div className="app-panel-soft p-5">
              <strong className="block text-lg font-medium text-[#f4ece0]">Contenido privado</strong>
              <span className="mt-2 block text-sm leading-6 text-[#aa957f]">
                Lectura, busqueda y CRUD sobre juegos.
              </span>
            </div>
            <div className="app-panel-soft p-5">
              <strong className="block text-lg font-medium text-[#f4ece0]">Consistencia</strong>
              <span className="mt-2 block text-sm leading-6 text-[#aa957f]">
                Misma paleta y diseño en todas las rutas.
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1d1510] bg-[#0a0705]/55 px-6 py-8 text-center text-sm text-[#8f7a67]">
        © 2026 Zona Gamer · React + Tailwind + Supabase
      </footer>

      {selectedGame ? (
        <ModalLandingGame selectedGame={selectedGame} setSelectedGame={setSelectedGame} />
      ) : null}
    </main>
  );
}

export default LandingPage;