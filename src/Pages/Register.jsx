import { useState } from "react";
import { Registrar } from "../Services/AuthService";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");

  const Registro = async (e) => {
    e.preventDefault();
    const { error } = await Registrar(email, password, nombre);

    if (error) {
      alert(error.message);
    } else {
      alert("exitoso");
      window.location.reload();
    }
  };

  return (
    <main className="app-shell flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_22%,rgba(137,85,40,0.16),transparent_18%),radial-gradient(circle_at_84%_18%,rgba(234,211,172,0.08),transparent_14%),linear-gradient(180deg,rgba(9,6,4,0)_0%,rgba(9,6,4,0.28)_100%)]" />

      <section className="grid w-full max-w-[1120px] gap-8 lg:grid-cols-[0.8fr_1fr]">
        <div className="app-panel hidden min-h-[680px] flex-col justify-between p-8 lg:flex">
          <div>
            <span className="app-kicker">Crear cuenta</span>
            <h1 className="app-title mt-5 text-[56px] leading-[0.95] tracking-[-0.05em]">
              Suma otro perfil a una interfaz ya unificada.
            </h1>
            <p className="app-copy mt-5 max-w-lg text-[15px] leading-8">
              El registro ahora comparte la misma paleta calida, superficies
              oscuras y profundidad visual del resto del proyecto.
            </p>
          </div>

          <div className="space-y-4">
            <div className="app-panel-soft p-5">
              <span className="app-kicker">Identidad visual</span>
              <p className="mt-3 text-sm leading-7 text-[#b9a18a]">
                Fondo mas moderno, contrastes coherentes y componentes reutilizables.
              </p>
            </div>
            <div className="app-panel-soft p-5">
              <span className="app-kicker">Escalable</span>
              <p className="mt-3 text-sm leading-7 text-[#b9a18a]">
                La misma base sirve para auth, landing, panel y modales.
              </p>
            </div>
          </div>
        </div>

        <div className="app-panel p-8 md:p-10">
          <div className="mb-8">
            <span className="app-kicker">Registro</span>
            <h2 className="app-title mt-4 text-4xl">Crear cuenta</h2>
            <p className="app-copy mt-3 text-sm leading-7">
              Completa los datos para acceder al catalogo y sus herramientas.
            </p>
          </div>

          <form className="space-y-5" onSubmit={Registro}>
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
                Nombre
              </label>
              <input
                className="app-input"
                placeholder="Tu nombre completo"
                type="text"
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
                Correo
              </label>
              <input
                className="app-input"
                placeholder="usuario@correo.com"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.22em] text-[#b8a38d]">
                Contrasena
              </label>
              <input
                className="app-input"
                placeholder="••••••••"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="app-button-primary mt-3 w-full" type="submit">
              Registrar
            </button>
          </form>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 text-sm text-[#9d8770]">
            <a className="transition hover:text-[#f2dfbf]" href="/">
              Volver al inicio
            </a>
            <p>
              Ya tienes cuenta?
              <a className="ml-1 text-[#ead3ac] transition hover:text-[#f2dfbf]" href="/Login">
                Inicia sesion
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Register;
