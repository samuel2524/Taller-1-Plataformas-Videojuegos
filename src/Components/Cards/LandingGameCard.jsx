function LandingGameCard({ game, onSelect }) {
  return (
    <article
      className="group relative min-h-[420px] overflow-hidden rounded-[28px] border border-[#3a2d23] shadow-[0_18px_40px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[#5b4434]"
      style={{
        backgroundImage: `url(${game.imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,6,4,0.18)_0%,rgba(9,6,4,0.52)_38%,rgba(9,6,4,0.94)_100%)]" />

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="flex justify-end">
          <span className="app-pill">{game.Genero}</span>
        </div>

        <div>
          <h4 className="text-3xl font-medium leading-tight tracking-tight text-[#f4ece0]">
            {game.nombre}
          </h4>

          <p className="mt-4 text-sm leading-7 text-[#d0beab]">{game.descripcion}</p>

          <button
            className="app-button-secondary mt-6 w-full"
            onClick={() => onSelect(game)}
          >
            Mas informacion
          </button>
        </div>
      </div>
    </article>
  );
}

export default LandingGameCard;
