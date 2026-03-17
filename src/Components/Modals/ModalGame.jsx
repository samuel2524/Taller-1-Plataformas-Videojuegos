import { useEffect, useState } from "react";
import { EditarJuego } from "../../Services/VideoJuegoService";
import { EliminarJuego } from "../../Services/VideoJuegoService";

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

    const { data, error } = await EditarJuego(selectedGame.id, datosActualizados);

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


  const Eliminar = async(e) => {
    e.preventDefault()

    const { data, error } = await EliminarJuego(selectedGame.id)
    if (error) {
      alert("Hubo un error al eliminar el juego");
      return;
    }else{
      alert("Juego eliminado correctamente")
      window.location.reload();
    }
    
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6 backdrop-blur-md"
      onClick={() => setSelectedGame(null)}
    >
      <div
        className="relative w-full max-w-3xl rounded-[2rem] border border-white/10 bg-gradient-to-b from-zinc-900 to-background-dark p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-4 top-4 h-11 w-11 rounded-full bg-white/10 text-xl text-white transition hover:bg-white/20"
          onClick={() => setSelectedGame(null)}
        >
          ×
        </button>

        <span className="text-xs uppercase tracking-[0.28em] text-primary">
          Información detallada
        </span>

        {editando ? (
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-3xl font-black tracking-tight text-white outline-none"
          />
        ) : (
          <h3 className="mt-4 text-4xl font-black tracking-tight">
            {selectedGame.nombre}
          </h3>
        )}

        <div className="mt-3">
          {editando ? (
            <input
              type="text"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full rounded-xl border border-primary/20 bg-primary/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-primary outline-none"
            />
          ) : (
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-primary">
              {selectedGame.Genero}
            </span>
          )}
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <h4 className="text-lg font-black text-primary">
              ¿De qué trata?
            </h4>

            {editando ? (
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={6}
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300 outline-none"
              />
            ) : (
              <p className="mt-3 leading-8 text-slate-300">
                {selectedGame.descripcion}
              </p>
            )}
          </div>

          <div>
            <h4 className="text-lg font-black text-primary">
              Plataformas
            </h4>

            {editando ? (
              <input
                type="text"
                value={plataformas}
                onChange={(e) => setPlataformas(e.target.value)}
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300 outline-none"
              />
            ) : (
              <p className="mt-3 leading-8 text-slate-300">
                {selectedGame.plataformas}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {editando ? (
            <>
              <button
                type="button"
                onClick={guardarCambios}
                disabled={guardando}
                className="rounded-xl bg-primary px-5 py-3 font-bold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {guardando ? "Guardando..." : "Guardar cambios"}
              </button>

              <button
                type="button"
                onClick={cancelarEdicion}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
            <button
              type="button"
              onClick={() => setEditando(true)}
              className="rounded-xl bg-primary px-5 py-3 font-bold text-black transition hover:opacity-90"
            >
              Editar
            </button>
            <button type="button" className="rounded-xl bg-primary px-5 py-3 font-bold text-black transition hover:opacity-90" onClick={Eliminar}>
                Eliminar
            </button>
            </>
            
            
          )}

        </div>
      </div>
    </div>
  );
}

export default ModalGame;