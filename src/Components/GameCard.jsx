function GameCard({ game, onSelect }) {
  return (
    <article
      className="relative min-h-[420px] overflow-hidden rounded-[1.8rem] border border-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.32)]"
      style={{
        backgroundImage: `url(${game.imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(29,26,21,0.16),rgba(29,26,21,0.68)_58%,rgba(29,26,21,0.96))]" />

      <div className="relative z-10 flex h-full flex-col justify-between p-6">
        <div className="flex justify-end">
          <span className="rounded-full border border-primary/20 bg-primary/35 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-black">
            {game.Genero}
          </span>
        </div>  

        <div>
          <h4 className="text-3xl font-black leading-tight tracking-tight">
            {game.nombre} 
          </h4>

          <p className="mt-4 text-sm leading-7 text-slate-200">
            {game.descripcion}
          </p>

          <button
            className="mt-6 w-full rounded-full border border-primary/20 bg-primary/10 px-4 py-3 font-bold text-primary transition hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/15"
            onClick={() => onSelect(game)}
          >
            Más información
          </button>
        </div>
      </div>
    </article>
  );
}

export default GameCard;