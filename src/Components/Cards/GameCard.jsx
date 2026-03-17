export default function GameCard({ game }) {
  return (
    <article className={`game-card game-card--${game.theme} ${game.featured ? "game-card--featured" : ""}`}>
      <div className="game-card__media" />
      <div className="game-card__shade" />
      <div className="game-card__copy">
        <p>{game.meta}</p>
        <h3>{game.title}</h3>
        <div className="game-card__tags">
          {game.tags.map((tag) => (
            <span key={`${game.title}-${tag}`}>{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}