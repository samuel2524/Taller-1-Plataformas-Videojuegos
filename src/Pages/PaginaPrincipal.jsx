import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalCrearJuego from "../Components/Modals/ModalCrearJuego";
import ModalGame from "../Components/Modals/ModalGame";
import { Logout } from "../Services/AuthService";
import { LeerVideojuegos } from "../Services/VideoJuegoService";
import { supabase } from "../lib/supaBaseCliente";

const generosBase = [
  { key: "Action", titulo: "Accion", descripcion: "Combate, velocidad y mundos con presencia." },
  { key: "Rpg", titulo: "RPG", descripcion: "Progresion, exploracion y sistemas con profundidad." },
  { key: "Adventure", titulo: "Aventura", descripcion: "Historias, exploracion y descubrimiento." },
  { key: "Sports", titulo: "Deportes", descripcion: "Competencia, reflejos y adrenalina." },
  { key: "Shooter", titulo: "Shooter", descripcion: "Precision, estrategia y ritmo." },
  { key: "Indie", titulo: "Indie", descripcion: "Ideas frescas, identidad y propuestas distintas." },
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

function GameCarousel({ section, onSelect }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(section.juegos.length > 1);

  const updateScrollState = () => {
    if (!trackRef.current) {
      return;
    }

    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    const maxScrollLeft = scrollWidth - clientWidth;
    const tolerance = 8;

    setCanScrollLeft(scrollLeft > tolerance);
    setCanScrollRight(maxScrollLeft - scrollLeft > tolerance);
  };

  const scrollByCards = (direction) => {
    if (!trackRef.current) {
      return;
    }

    const firstCard = trackRef.current.querySelector("[data-card]");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 280;
    const scrollAmount = cardWidth * 1.15;

    trackRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    updateScrollState();

    const track = trackRef.current;
    if (!track) {
      return;
    }

    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [section.juegos.length]);

  return (
    <section className="mt-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[30px] font-light tracking-tight text-[#f4ece0] md:text-[36px]">
            {section.titulo}
          </h2>
          <p className="mt-1 max-w-2xl text-[15px] text-[#a18c78]">
            {section.descripcion}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={!canScrollLeft}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2f241d] bg-[#130f0d] text-xl text-[#ddc8a8] transition hover:border-[#4a382c] hover:bg-[#1a1410] disabled:pointer-events-none disabled:opacity-0"
            aria-label={`Desplazar ${section.titulo} a la izquierda`}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={!canScrollRight}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2f241d] bg-[#130f0d] text-xl text-[#ddc8a8] transition hover:border-[#4a382c] hover:bg-[#1a1410] disabled:pointer-events-none disabled:opacity-0"
            aria-label={`Desplazar ${section.titulo} a la derecha`}
          >
            →
          </button>
        </div>
      </div>

      <div className="relative mt-5">
        <div
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-12 bg-gradient-to-r from-[#090604] to-transparent transition duration-300 md:block ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-12 bg-gradient-to-l from-[#090604] to-transparent transition duration-300 md:block ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          ref={trackRef}
          className="grid auto-cols-[85%] grid-flow-col gap-4 overflow-x-auto pb-3 pl-1 pr-1 scroll-smooth snap-x snap-mandatory md:auto-cols-[calc((100%-1rem)/2)] xl:auto-cols-[calc((100%-2rem)/3)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
        {section.juegos.map((game, index) => (
          <button
            key={game.id || `${section.key}-${index}`}
            type="button"
            data-card="true"
            onClick={() => onSelect(game)}
            className="group relative min-h-[360px] snap-start overflow-hidden rounded-[28px] border border-[#3a2d23] text-left shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-[#5b4434]"
            style={{
              backgroundImage: `url(${game.imagen})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,5,4,0.2)_0%,rgba(7,5,4,0.48)_38%,rgba(7,5,4,0.92)_100%)] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(7,5,4,0.18)_0%,rgba(7,5,4,0.44)_34%,rgba(7,5,4,0.94)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(circle_at_bottom,rgba(0,0,0,0.15),transparent_60%)]" />

            <div className="relative flex h-full flex-col justify-end p-5">
              <div className="mb-3 flex flex-wrap gap-2">
                {buildTags(game.Genero, "Catalogo").slice(0, 2).map((tag) => (
                  <span
                    key={`${game.id || game.nombre}-${tag}`}
                    className="rounded-full border border-[#f0dbc01c] bg-[#140f0dd9] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d8c3a6]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-[24px] font-medium leading-tight text-[#f4ece0]">
                {game.nombre}
              </h3>
              <p className="mt-2 line-clamp-3 text-[13px] leading-6 text-[#d4c2af]">
                {game.descripcion}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {formatPlatforms(game.plataformas).slice(0, 3).map((platform) => (
                  <span
                    key={`${game.id || game.nombre}-${platform}`}
                    className="rounded-md border border-[#3b2d24] bg-[#110d0be3] px-2.5 py-1 text-[10px] uppercase tracking-[0.08em] text-[#ceb89b]"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
        </div>
      </div>
    </section>
  );
}

function Principal() {
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [juegos, setJuegos] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [verificandoSesion, setVerificandoSesion] = useState(true);
  const [cargandoJuegos] = useState(false);
  const [mostrarModalCrearJuego, setMostrarModalCrearJuego] = useState(false);

  const UserLogout = async () => {
    await Logout();
    navigate("/Login");
  };

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

  const juegoDestacado = juegosFiltrados.length > 0 ? juegosFiltrados[0] : null;

  const seccionesGenero = useMemo(
    () =>
      generosBase
        .map((genero) => ({
          ...genero,
          juegos: getGamesByGenre(juegosFiltrados, genero.key),
        }))
        .filter((seccion) => seccion.juegos.length > 0),
    [juegosFiltrados]
  );

  if (verificandoSesion) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#090604] px-6 text-[#f4ede1]">
        <div className="w-full max-w-md rounded-[28px] border border-[#2c221b] bg-[#140f0c] p-8 text-center shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#cab394]">
            Zona Gamer
          </span>
          <h1 className="mt-4 text-3xl font-light tracking-tight">Cargando panel</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#090604] text-[#f3eadf]">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(120,73,33,0.22),transparent_18%),radial-gradient(circle_at_85%_30%,rgba(85,53,28,0.18),transparent_20%),linear-gradient(180deg,#100a07_0%,#090604_38%,#070403_100%)]" />

      <header className="border-b border-[#1d1510] bg-[#0d0907]/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 px-5 py-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#ebddca]">
              <span className="text-[#d3bd9a]">◓</span>
              <span>ZONA GAMER</span>
            </div>

            <nav className="flex items-center gap-4 text-sm text-[#bba890]">
              <a
                href="/"
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
                placeholder="Buscar juegos..."
                className="w-40 bg-transparent text-[#f0e4d4] outline-none placeholder:text-[#7e6a58]"
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

      <section id="home" className="mx-auto max-w-[1240px] px-5 pb-8 pt-6">
        {juegoDestacado && (
          <article
            className="relative min-h-[520px] overflow-hidden rounded-[32px] border border-[#2c221c] shadow-[0_22px_60px_rgba(0,0,0,0.34)]"
            style={{
              backgroundImage: `url(${juegoDestacado.imagen})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,6,5,0.94)_0%,rgba(8,6,5,0.78)_42%,rgba(8,6,5,0.4)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.58)_100%)]" />

            <div className="relative flex min-h-[520px] flex-col justify-between p-6 md:p-8 lg:p-10">
              <div className="max-w-[620px]">
                <span className="inline-flex rounded-full border border-[#534234] bg-[#211813cc] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#d8c4a7]">
                  {busqueda.trim() ? "Resultado destacado" : "Featured release"}
                </span>

                <h1 className="mt-5 text-[42px] font-light leading-[0.92] tracking-[-0.05em] text-[#f5efe6] md:text-[64px] lg:text-[76px]">
                  {juegoDestacado.nombre}
                </h1>

                <p className="mt-4 max-w-[560px] text-[15px] leading-7 text-[#d6c4b1] md:text-[16px]">
                  {juegoDestacado.descripcion}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {buildTags(juegoDestacado.Genero, "Catalogo").map((tag) => (
                    <span
                      key={`featured-${tag}`}
                      className="rounded-full border border-[#f0dbc026] bg-[#140f0dd1] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#d8c3a6]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => setSelectedGame(juegoDestacado)}
                    className="rounded-2xl border border-[#3d3026] bg-[#1c1512d9] px-5 py-3 text-sm font-semibold text-[#f0e4d4] transition hover:bg-[#2a211b]"
                  >
                    Ver detalles →
                  </button>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-[18px] border border-[#ffffff14] bg-[#0d0907b5] p-4 backdrop-blur-sm">
                  <p className="text-[28px] font-semibold text-[#f6efe4]">{juegos.length}</p>
                  <p className="mt-1 text-xs text-[#b9a792]">Titulos en catalogo</p>
                </div>
                <div className="rounded-[18px] border border-[#ffffff14] bg-[#0d0907b5] p-4 backdrop-blur-sm">
                  <p className="text-[28px] font-semibold text-[#f6efe4]">
                    {new Set(juegos.flatMap((juego) => buildTags(juego.Genero, ""))).size}
                  </p>
                  <p className="mt-1 text-xs text-[#b9a792]">Generos indexados</p>
                </div>
                <div className="rounded-[18px] border border-[#ffffff14] bg-[#0d0907b5] p-4 backdrop-blur-sm">
                  <p className="text-[28px] font-semibold text-[#f6efe4]">
                    {juegosFiltrados.length}
                  </p>
                  <p className="mt-1 text-xs text-[#b9a792]">Resultados visibles</p>
                </div>
              </div>
            </div>
          </article>
        )}

        {seccionesGenero.length > 0 ? (
          seccionesGenero.map((seccion) => (
            <GameCarousel
              key={seccion.key}
              section={seccion}
              onSelect={setSelectedGame}
            />
          ))
        ) : (
          <section className="mt-10 rounded-[28px] border border-[#2c221c] bg-[#120d0a] px-6 py-10 text-center">
            <h2 className="text-2xl font-light text-[#f4ece0]">No hay resultados</h2>
            <p className="mt-2 text-sm text-[#9f8a77]">
              Ajusta el filtro de busqueda o agrega nuevos juegos al catalogo.
            </p>
          </section>
        )}

        <footer className="mt-12 rounded-[24px] border border-[#241b15] bg-[#110d0b] px-6 py-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[14px] font-semibold uppercase tracking-[0.08em] text-[#eadfce]">
                <span className="text-[#d2bb9a]">◓</span>
                <span>ZONA GAMER</span>
              </div>
              <p className="mt-2 text-[14px] text-[#aa957f]">
                Explora el catalogo por genero con una navegacion mas ligera.
              </p>
            </div>

            <p className="text-[14px] text-[#b9a18a]">
              © 2026 Zona Gamer. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      </section>

      {selectedGame ? (
        <ModalGame selectedGame={selectedGame} setSelectedGame={setSelectedGame} />
      ) : null}

      {mostrarModalCrearJuego ? (
        <ModalCrearJuego onClose={() => setMostrarModalCrearJuego(false)} />
      ) : null}
    </main>
  );
}

export default Principal;
