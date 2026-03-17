import { useRef,useEffect,useState } from "react";


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

export default function GameCarousel({ section, onSelect }) {
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
