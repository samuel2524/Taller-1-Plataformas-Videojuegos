import { useState } from "react";
import { useEffect } from "react";
import accion from "../assets/accion.jpg";
import rpg from "../assets/rpg.jpg"
import sandbox from "../assets/sandbox.jpg"
import multijugador from "../assets/multijugador.jpg"
import shooter from "../assets/shooter.jpg"
import GameCard from "../Components/GameCard";
import { LeerVideojuegos } from "../Services/VideoJuegoService";
import ModalGame from "../Components/ModalGame";


function LandinPage() {


  const [juegos,setJuego ] = useState([])
  // juegos = juegos.slice(0,100)


  useEffect(()=>{
    const LeerJuego =async() =>{  
    const response = await LeerVideojuegos()
    setJuego(response.data)
    }
    LeerJuego()
  },[]);

  

  const categories = [
  { name: "Acción", image: accion },

  {
    name: "Aventura",
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200&q=80",
  },

  { name: "RPG", image: rpg },

  {
    name: "Deportes",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80",
  },

  { name: "Sandbox", image: sandbox },

  { name: "Multijugador", image: multijugador },

  { name: "Shooter", image: shooter },

  {
    name: "Estrategia",
    image: "https://images.unsplash.com/photo-1528819622765-d6bcf132f793?auto=format&fit=crop&w=1200&q=80",
  },
]


  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background-dark font-display text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(208,187,149,0.16),transparent_24%),radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_20%),linear-gradient(to_bottom,#1d1a15,#111111,#1d1a15)]" />
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(circle_at_center,black_35%,transparent_100%)]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-background-dark/80 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-5 md:px-10 xl:px-14">
          <div>
            <span className="block text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Interactive Showcase
            </span>
            <h1 className="text-3xl font-black tracking-tight text-primary">
              GameZone
            </h1>
          </div>

          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="#inicio" className="transition hover:text-primary">
              Inicio
            </a>
            <a href="#categorias" className="transition hover:text-primary">
              Categorías
            </a>
            <a href="#destacados" className="transition hover:text-primary">
              Destacados
            </a>
            <a href="#proyecto" className="transition hover:text-primary">
              Proyecto
            </a>
          </nav>
        </div>
      </header>

      <section
        id="inicio"
        className="grid min-h-[calc(100vh-88px)] grid-cols-1 gap-10 px-6 py-12 md:px-10 xl:grid-cols-[1.15fr_0.85fr] xl:px-14"
      >
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            Landing page de videojuegos
          </span>

          <h2 className="mt-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
            Una experiencia visual premium, gamer y lista para crecer.
          </h2>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            GameZone es una página informativa desarrollada en React y Tailwind
            para presentar videojuegos, géneros y cultura gamer con una estética
            seria, moderna y visualmente fuerte.
          </p>

          <div className="flex mt-6 gap-6">
            <a
              href="#destacados"
              className="inline-block rounded-full bg-primary px-6 py-3 font-bold text-background-dark shadow-[0_12px_30px_rgba(208,187,149,0.28)] transition hover:-translate-y-0.5"
            >
              Explorar juegos
            </a>

             <a
              href="/Login"
              className="inline-block rounded-full bg-primary px-6 py-3 font-bold text-background-dark shadow-[0_12px_30px_rgba(208,187,149,0.28)] transition hover:-translate-y-0.5"
            >
              Iniciar Sesion
            </a>

              <a
              href="/Register"
              className="inline-block rounded-full bg-primary px-6 py-3 font-bold text-background-dark shadow-[0_12px_30px_rgba(208,187,149,0.28)] transition hover:-translate-y-0.5"
            >
              Registrate
            </a>
            
          </div>

          <div className="mt-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-full border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <strong className="block text-3xl font-black text-primary">
                100
              </strong>
              <span className="mt-2 block text-sm text-slate-400">
                Juegos destacados
              </span>
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <strong className="block text-3xl font-black text-primary">
                09
              </strong>
              <span className="mt-2 block text-sm text-slate-400">
                Mostrados en la landing
              </span>
            </div>

            <div className="rounded-full border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
              <strong className="block text-3xl font-black text-primary">
                Tailwind
              </strong>
              <span className="mt-2 block text-sm text-slate-400">
                Estilos del proyecto
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-zinc-900/95 to-background-dark p-8 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
            <span className="text-xs uppercase tracking-[0.28em] text-primary">
              Tema del taller
            </span>
            <h3 className="mt-4 text-4xl font-black tracking-tight text-primary">
              Videojuegos
            </h3>
            <p className="mt-4 leading-8 text-slate-300">
              Un sitio visual para mostrar títulos destacados, géneros y una
              experiencia pública atractiva antes de integrar Supabase.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <span className="text-xs uppercase tracking-[0.22em] text-primary">
                UI
              </span>
              <strong className="mt-3 block text-2xl font-black">
                Diseño inmersivo
              </strong>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <span className="text-xs uppercase tracking-[0.22em] text-primary">
                Data
              </span>
              <strong className="mt-3 block text-2xl font-black">
                Escalable a CRUD
              </strong>
            </div>
          </div>
        </div>
      </section>

      <section id="categorias" className="px-6 py-20 md:px-10 xl:px-14">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <span className="mx-auto mb-4 block h-[2px] w-20 bg-gradient-to-r from-primary to-white" />
          <span className="text-xs uppercase tracking-[0.28em] text-primary">
            Categorías
          </span>
          <h3 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Explora diferentes estilos de juego
          </h3>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Estas categorías ayudan a organizar el contenido y representan
            distintos tipos de experiencias dentro del universo gamer.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category.name}
              className="group relative min-h-[210px] overflow-hidden rounded-[1.75rem] border border-white/10 transition duration-500 hover:scale-[1.03]"
              style={{
                backgroundImage: `url(${category.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition duration-500" />
              <div className="relative z-10 flex h-full items-end p-6">
                <span className="text-3xl font-black tracking-tight">
                  {category.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="destacados" className="px-6 py-20 md:px-10 xl:px-14">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <span className="mx-auto mb-4 block h-[2px] w-20 bg-gradient-to-r from-primary to-white" />
          <span className="text-xs uppercase tracking-[0.28em] text-primary">
            Destacados
          </span>
          <h3 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
            Videojuegos principales
          </h3>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Selección de 9 juegos organizados visualmente. Cada tarjeta abre una
            ventana con más información, características y contexto.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {juegos.slice(0,9).map((juego) => ( 
           <GameCard
              key={juego.id} // para que react sea que gamecard es cada uno gamecard = 30 es gta
              game={juego}
              onSelect={setSelectedGame}
            />
          ))}
        </div>
      </section>

      <section id="proyecto" className="px-6 py-10 pb-24 md:px-10 xl:px-14">
        <div className="grid grid-cols-1 gap-8 rounded-[2rem] border border-white/10 bg-gradient-to-b from-zinc-900/95 to-background-dark p-8 xl:grid-cols-2">
          <div>
            <span className="text-xs uppercase tracking-[0.28em] text-primary">
              Proyecto
            </span>
            <h3 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
              Base visual del taller
            </h3>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Esta landing cumple la parte de página pública informativa y deja
              una estructura clara para evolucionar hacia un sistema con
              registro, login, listado, búsqueda y CRUD usando Supabase.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-5">
              <strong className="block text-lg font-black text-primary">
                Página pública
              </strong>
              <span className="mt-2 block text-sm leading-6 text-slate-400">
                Presentación del tema videojuegos
              </span>
            </div>

            <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-5">
              <strong className="block text-lg font-black text-primary">
                Autenticación
              </strong>
              <span className="mt-2 block text-sm leading-6 text-slate-400">
                Registro e inicio de sesión
              </span>
            </div>

            <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-5">
              <strong className="block text-lg font-black text-primary">
                Contenido dinámico
              </strong>
              <span className="mt-2 block text-sm leading-6 text-slate-400">
                Listado y búsqueda por nombre
              </span>
            </div>

            <div className="rounded-[1rem] border border-white/10 bg-white/[0.04] p-5">
              <strong className="block text-lg font-black text-primary">
                CRUD
              </strong>
              <span className="mt-2 block text-sm leading-6 text-slate-400">
                Crear, editar y eliminar elementos
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black/10 px-6 py-8 text-center text-sm text-slate-400">
        © 2026 GameZone · Landing page hecha con React + Tailwind
      </footer>

      {selectedGame && (
        <ModalGame
          selectedGame = {selectedGame}
          setSelectedGame={setSelectedGame}
        ></ModalGame>
      )}
    </div>
  );
}

export default LandinPage;