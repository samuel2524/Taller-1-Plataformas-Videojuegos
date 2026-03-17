
function ModalGame({selectedGame,setSelectedGame}){

    return(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
          onClick={() => setSelectedGame(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-[2rem] border border-white/10 bg-gradient-to-b from-zinc-900 to-background-dark p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 h-11 w-11 rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20"
              onClick={() => setSelectedGame(null)}
            >
              ×
            </button>

            <span className="text-xs uppercase tracking-[0.28em] text-primary">
              Información detallada
            </span>

            <h3 className="mt-4 text-4xl font-black tracking-tight">
              {selectedGame.nombre}
            </h3>

            <span className="mt-3 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              {selectedGame.Genero}
            </span>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="text-lg font-black text-primary">
                  ¿De qué trata?
                </h4>
                <p className="mt-3 leading-8 text-slate-300">
                  {selectedGame.descripcion}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-black text-primary">
                  Plataformas
                </h4>
                <p className="mt-3 leading-8 text-slate-300">
                  {selectedGame.plataformas}
                </p>

          
              </div>
            </div>
          </div>
        </div>
    );
}

export default ModalGame;