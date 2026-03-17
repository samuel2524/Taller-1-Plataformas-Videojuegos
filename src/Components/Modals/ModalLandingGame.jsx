function ModalLandingGame({ selectedGame, setSelectedGame }) {
  return (
    <div className="app-backdrop" onClick={() => setSelectedGame(null)}>
      <div
        className="app-panel relative w-full max-w-4xl overflow-hidden p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative min-h-[240px] border-b border-[#33251c] bg-cover bg-center"
          style={{ backgroundImage: `url(${selectedGame.imagen})` }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,6,5,0.22)_0%,rgba(8,6,5,0.76)_80%,rgba(8,6,5,0.94)_100%)]" />
          <button
            type="button"
            className="app-button-secondary absolute right-5 top-5 z-20 h-11 w-11 rounded-full px-0 text-xl"
            onClick={() => setSelectedGame(null)}
          >
            ×
          </button>

          <div className="relative flex min-h-[240px] flex-col justify-end p-8">
            <span className="app-kicker">Vista publica</span>
            <h3 className="app-title mt-4 max-w-3xl text-4xl md:text-5xl">{selectedGame.nombre}</h3>
            <div className="mt-4">
              <span className="app-pill">{selectedGame.Genero}</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h4 className="app-kicker">Descripcion</h4>
            <p className="mt-4 text-[15px] leading-8 text-[#d3c2b0]">{selectedGame.descripcion}</p>
          </div>

          <div className="space-y-6">
            <div className="app-panel-soft p-5">
              <h4 className="app-kicker">Plataformas</h4>
              <p className="mt-4 text-sm leading-7 text-[#d3c2b0]">{selectedGame.plataformas}</p>
            </div>

            <div className="app-panel-soft p-5">
              <h4 className="app-kicker">Acceso completo</h4>
              <p className="mt-4 text-sm leading-7 text-[#d3c2b0]">
                Inicia sesion para entrar al panel privado, consultar la base real y usar el CRUD.
              </p>
              <div className="mt-4">
                <a href="/Login" className="app-button-primary">
                  Ir al login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalLandingGame;
