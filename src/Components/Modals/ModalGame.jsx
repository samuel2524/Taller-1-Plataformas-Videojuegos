import { useEffect, useState } from "react";
import { EditarJuego, EliminarJuego } from "../../Services/VideoJuegoService";

function ModalGame({ selectedGame, setSelectedGame }) {
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [genero, setGenero] = useState("");
  const [plataformas, setPlataformas] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    if (!selectedGame) return;

    setNombre(selectedGame.nombre || "");
    setDescripcion(selectedGame.descripcion || "");
    setGenero(selectedGame.Genero || "");
    setPlataformas(selectedGame.plataformas || "");
    setEditando(false);
  }, [selectedGame]);

  const cancelarEdicion = () => {
    setNombre(selectedGame.nombre || "");
    setDescripcion(selectedGame.descripcion || "");
    setGenero(selectedGame.Genero || "");
    setPlataformas(selectedGame.plataformas || "");
    setEditando(false);
  };

  const guardarCambios = async () => {
    setGuardando(true);

    const datosActualizados = {
      nombre,
      descripcion,
      Genero: genero,
      plataformas,
    };

    const { error } = await EditarJuego(selectedGame.id, datosActualizados);
    setGuardando(false);

    if (error) {
      alert("Hubo un error al editar el juego");
      return;
    }

    alert("Juego actualizado correctamente");

    setSelectedGame({
      ...selectedGame,
      nombre,
      descripcion,
      Genero: genero,
      plataformas,
    });

    setEditando(false);
  };

  const Eliminar = async (e) => {
    e.preventDefault();

    const { error } = await EliminarJuego(selectedGame.id);
    if (error) {
      alert("Hubo un error al eliminar el juego");
      return;
    }

    alert("Juego eliminado correctamente");
    window.location.reload();
  };

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
            <span className="app-kicker">Informacion detallada</span>

            {editando ? (
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="app-input mt-4 max-w-2xl text-3xl font-light"
              />
            ) : (
              <h3 className="app-title mt-4 max-w-3xl text-4xl md:text-5xl">{selectedGame.nombre}</h3>
            )}

            <div className="mt-4">
              {editando ? (
                <input
                  type="text"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                  className="app-input max-w-sm text-xs font-semibold uppercase tracking-[0.18em]"
                />
              ) : (
                <span className="app-pill">{selectedGame.Genero}</span>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h4 className="app-kicker">Descripcion</h4>
            {editando ? (
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={7}
                className="app-textarea mt-3"
              />
            ) : (
              <p className="mt-4 text-[15px] leading-8 text-[#d3c2b0]">{selectedGame.descripcion}</p>
            )}
          </div>

          <div className="space-y-6">
            <div className="app-panel-soft p-5">
              <h4 className="app-kicker">Plataformas</h4>
              {editando ? (
                <input
                  type="text"
                  value={plataformas}
                  onChange={(e) => setPlataformas(e.target.value)}
                  className="app-input mt-3"
                />
              ) : (
                <p className="mt-4 text-sm leading-7 text-[#d3c2b0]">{selectedGame.plataformas}</p>
              )}
            </div>

            <div className="app-panel-soft p-5">
              <h4 className="app-kicker">Acciones</h4>
              <div className="mt-4 flex flex-wrap gap-3">
                {editando ? (
                  <>
                    <button
                      type="button"
                      onClick={guardarCambios}
                      disabled={guardando}
                      className="app-button-primary disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {guardando ? "Guardando..." : "Guardar cambios"}
                    </button>

                    <button
                      type="button"
                      onClick={cancelarEdicion}
                      className="app-button-secondary"
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => setEditando(true)}
                      className="app-button-primary"
                    >
                      Editar
                    </button>
                    <button type="button" className="app-button-secondary" onClick={Eliminar}>
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalGame;
