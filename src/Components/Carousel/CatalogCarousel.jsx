
import { useRef } from "react";
import GameCard from "../Cards/GameCard";
import ChevronIcon from "../Icons/ChevronIcon";

export default function CatalogCarousel({ section }) {
  const trackRef = useRef(null);

  const scrollByCard = (direction) => {
    if (!trackRef.current) {
      return;
    }

    // El scroll se mueve por "tarjetas y media" para que el usuario
    // mantenga contexto visual del siguiente grupo de juegos.
    const cardWidth = trackRef.current.firstElementChild?.getBoundingClientRect().width ?? 320;
    const gap = 16;
    trackRef.current.scrollBy({
      left: direction * (cardWidth * 1.5 + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="catalog-section">
      <div className="catalog-section__header">
        <div>
          <h2>{section.title}</h2>
          <p>{section.description}</p>
        </div>

        <div className="carousel-controls" aria-label={`Controles del carrusel ${section.title}`}>
          <button type="button" className="carousel-btn" onClick={() => scrollByCard(-1)}>
            <ChevronIcon direction="left" />
          </button>
          <button type="button" className="carousel-btn" onClick={() => scrollByCard(1)}>
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>

      <div ref={trackRef} className="catalog-carousel">
        {section.games.map((game, index) => (
          <GameCard key={`${section.title}-${game.title}-${index}`} game={game} />
        ))}
      </div>
    </section>
  );
}