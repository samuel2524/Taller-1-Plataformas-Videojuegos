
export default function HighlightCard({ game }) {
  return (
    <article className={`highlight-card highlight-card--${game.theme}`}>
      <div className="highlight-card__shade" />
      <div className="highlight-card__copy">
        <p>{game.subtitle}</p>
        <h3>{game.title}</h3>
      </div>
    </article>
  );

}