import { useState } from "react";
import { CrearJuego } from "../../Services/VideoJuegoService";

function ModalCrearJuego({ onClose }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [plataformas, setPlataformas] = useState("");
  const [genero, setGenero] = useState("");

  const CrearJuegoCrud = async (e) => {
    e.preventDefault();
    const { error } = await CrearJuego(nombre, descripcion, plataformas, genero);

    if (error) {
      console.log("hubo un error creando el juego");
      alert("error");
    } else {
      alert("Creacion de juego exitosa");
      window.location.reload();
    }
  };

  return (
    <div className="app-backdrop" onClick={onClose}>
      <div
        className="app-panel relative w-full max-w-3xl p-8 md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="app-button-secondary absolute right-5 top-5 z-20 h-11 w-11 rounded-full px-0 text-xl"
          onClick={onClose}
        >
          ×
        </button>

        <div className="mb-8">
          <span className="app-kicker">Nuevo registro</span>
          <h3 className="app-title mt-4 text-4xl">Crear juego</h3>
          <p className="app-copy mt-3 text-sm leading-7">
            Agrega un titulo al catalogo usando la misma linea visual del panel.
          </p>
        </div>

        <form className="grid gap-5 md:grid-cols-2" onSubmit={CrearJuegoCrud}>
          <div className="md:col-span-2">
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
              Nombre
            </label>
            <input className="app-input" type="text" onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
              Descripcion
            </label>
            <textarea
              className="app-textarea"
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
              Plataformas
            </label>
            <input
              className="app-input"
              type="text"
              onChange={(e) => setPlataformas(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
              Genero
            </label>
            <input className="app-input" type="text" onChange={(e) => setGenero(e.target.value)} />
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button type="button" className="app-button-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button className="app-button-primary" type="submit">
              Crear juego
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCrearJuego;
